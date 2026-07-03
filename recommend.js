const API_CONFIG = {
    keyId: "c3e54af0e795400d89e4",
    serviceId: "COOKRCP01",
    dataType: "json",
    startIdx: 1,
    endIdx: 100
};

let recipes = [];
let lastRecommendedRecipes = [];
let recipesLoaded = false;

function getApiUrl() {
    const { keyId, serviceId, dataType, startIdx, endIdx } = API_CONFIG;
    return `https://openapi.foodsafetykorea.go.kr/api/${keyId}/${serviceId}/${dataType}/${startIdx}/${endIdx}`;
}

function toNumber(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
}

function parseIngredients(value) {
    if (!value) return [];
    return value.replace(/\([^)]*\)/g, "").split(/[\n,;/|]+/).map(item => item.trim()).filter(Boolean);
}

function parseSteps(row) {
    const steps = [];
    for (let i = 1; i <= 20; i++) {
        const key = `MANUAL${String(i).padStart(2, "0")}`;
        const step = row[key]?.trim();
        if (step) steps.push(step);
    }
    return steps.length > 0 ? steps : ["등록된 조리 순서가 없습니다."];
}

function getDifficulty(steps) {
    if (steps.length <= 4) return "쉬움";
    if (steps.length <= 7) return "보통";
    return "어려움";
}

function normalizeRecipe(row, index) {
    const steps = parseSteps(row);
    return {
        id: index + 1,
        name: row.RCP_NM || "이름 없는 레시피",
        difficulty: getDifficulty(steps),
        time: Math.min(60, 10 + steps.length * 5),
        image: row.ATT_FILE_NO_MAIN || row.ATT_FILE_NO_MK || "https://placehold.co/600x400?text=%EC%9D%B4%EB%AF%B8%EC%A7%80+%EC%97%86%EC%9D%8C",
        ingredients: parseIngredients(row.RCP_PARTS_DTLS),
        nutrition: {
            protein: toNumber(row.INFO_PRO),
            carb: toNumber(row.INFO_CAR),
            fat: toNumber(row.INFO_FAT),
            kcal: toNumber(row.INFO_ENG)
        },
        steps
    };
}

async function loadRecipes() {
    if (recipesLoaded) return recipes;
    setLoading(true, "레시피를 불러오는 중...");
    try {
        const response = await fetch(getApiUrl());
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        const data = await response.json();
        const rows = data[API_CONFIG.serviceId]?.row || [];
        recipes = rows.map(normalizeRecipe);
        lastRecommendedRecipes = [...recipes];
        recipesLoaded = true;
        displayRecipes(recipes);
        return recipes;
    } catch (error) {
        console.error(error);
        showMessage("레시피를 불러오지 못했습니다. API 키와 네트워크 상태를 확인해 주세요.");
        return [];
    } finally {
        setLoading(false);
    }
}

function getUserIngredients() {
    return document.getElementById("ingredientInput").value.split(",").map(item => item.trim()).filter(Boolean);
}

function hasIngredient(recipeIngredient, userIngredient) {
    const recipeText = recipeIngredient.toLowerCase();
    const userText = userIngredient.toLowerCase();
    return recipeText.includes(userText) || userText.includes(recipeText);
}

function calculateIngredientScore(recipe, userIngredients) {
    if (recipe.ingredients.length === 0 || userIngredients.length === 0) return 0;
    const match = userIngredients.filter(userIngredient => recipe.ingredients.some(recipeIngredient => hasIngredient(recipeIngredient, userIngredient))).length;
    return match / recipe.ingredients.length;
}

function nutritionScore(recipe) {
    const p = recipe.nutrition.protein;
    const c = recipe.nutrition.carb;
    const f = recipe.nutrition.fat;
    return (p * 2) + Math.max(0, 40 - Math.abs(c - 40)) + Math.max(0, 20 - f);
}

function totalScore(recipe, userIngredients) {
    return calculateIngredientScore(recipe, userIngredients) * 70 + nutritionScore(recipe) * 0.3;
}

function sortByMatchRate(recipeList, userIngredients) {
    return recipeList.sort((a, b) => {
        const matchDiff = calculateIngredientScore(b, userIngredients) - calculateIngredientScore(a, userIngredients);
        return matchDiff || nutritionScore(b) - nutritionScore(a);
    });
}

async function recommendRecipes() {
    await loadRecipes();
    const userIngredients = getUserIngredients();
    if (userIngredients.length === 0) {
        alert("재료를 입력해 주세요.");
        return [];
    }
    lastRecommendedRecipes = sortByMatchRate(
        recipes.map(recipe => ({ ...recipe, score: totalScore(recipe, userIngredients) })),
        userIngredients
    );
    return lastRecommendedRecipes;
}

function missingIngredients(recipe, userIngredients) {
    return recipe.ingredients.filter(recipeIngredient => !userIngredients.some(userIngredient => hasIngredient(recipeIngredient, userIngredient)));
}

function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function showMessage(message) {
    document.querySelector(".cards").innerHTML = `<div class="empty-message">${escapeHtml(message)}</div>`;
}

function setLoading(isLoading, message = "추천 레시피를 찾는 중...") {
    const loading = document.getElementById("loading");
    loading.innerText = message;
    loading.style.display = isLoading ? "block" : "none";
}

function displayRecipes(recipeList) {
    const cards = document.querySelector(".cards");
    const userIngredients = getUserIngredients();
    cards.innerHTML = "";
    if (recipeList.length === 0) {
        showMessage("추천할 레시피를 찾지 못했습니다.");
        return;
    }
    recipeList.forEach(recipe => {
        const matchRate = Math.round(calculateIngredientScore(recipe, userIngredients) * 100);
        const missing = missingIngredients(recipe, userIngredients).slice(0, 8);
        cards.innerHTML += `
            <div class="card" onclick="showRecipe(${recipe.id})">
                <img src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}" onerror="this.src='https://placehold.co/600x400?text=%EC%9D%B4%EB%AF%B8%EC%A7%80+%EC%97%86%EC%9D%8C'">
                <div class="card-body">
                    <div class="tag">${escapeHtml(recipe.difficulty)}</div>
                    <h3>${escapeHtml(recipe.name)}</h3>
                    <p class="info">일치율 ${matchRate}%<br>조리 시간 ${recipe.time}분<br><br><b>부족한 재료</b><br>${missing.length > 0 ? escapeHtml(missing.join(", ")) : "없음"}</p>
                </div>
            </div>`;
    });
}

document.getElementById("recommendBtn").addEventListener("click", async () => {
    setLoading(true, "추천 레시피를 찾는 중...");
    const recommend = await recommendRecipes();
    setLoading(false);
    displayRecipes(recommend);
});

async function filterDifficulty(level) {
    const recommend = lastRecommendedRecipes.length > 0 ? lastRecommendedRecipes : await recommendRecipes();
    displayRecipes(level === "전체" ? recommend : recommend.filter(recipe => recipe.difficulty === level));
}

document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => filterDifficulty(btn.innerText.trim())));

document.getElementById("recipeSearch").addEventListener("input", async function () {
    await loadRecipes();
    const keyword = this.value.toLowerCase().trim();
    const source = lastRecommendedRecipes.length > 0 ? lastRecommendedRecipes : recipes;
    displayRecipes(source.filter(recipe => recipe.name.toLowerCase().includes(keyword)));
});

document.getElementById("sortSelect").addEventListener("change", async function () {
    const result = lastRecommendedRecipes.length > 0 ? [...lastRecommendedRecipes] : await recommendRecipes();
    if (this.value === "time") result.sort((a, b) => a.time - b.time);
    if (this.value === "protein") result.sort((a, b) => b.nutrition.protein - a.nutrition.protein);
    if (this.value === "score") sortByMatchRate(result, getUserIngredients());
    displayRecipes(result);
});

document.getElementById("ingredientInput").addEventListener("keypress", async function (event) {
    if (event.key === "Enter") {
        setLoading(true, "추천 레시피를 찾는 중...");
        const recommend = await recommendRecipes();
        setLoading(false);
        displayRecipes(recommend);
    }
});

window.addEventListener("DOMContentLoaded", loadRecipes);
