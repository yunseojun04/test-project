function getUserIngredients() {
    const input = document.getElementById("ingredientInput").value;

    return input
        .split(",")
        .map(item => item.trim())
        .filter(item => item !== "");
}

function calculateIngredientScore(recipe, userIngredients){

    let match = 0;

    userIngredients.forEach(item=>{

        if(recipe.ingredients.includes(item)){
            match++;
        }

    });

    return match / recipe.ingredients.length;
}

function nutritionScore(recipe){

    const p = recipe.nutrition.protein;
    const c = recipe.nutrition.carb;
    const f = recipe.nutrition.fat;

    let score = 0;

    score += p * 2;

    score += Math.max(0,40-Math.abs(c-40));

    score += Math.max(0,20-f);

    return score;
}

function totalScore(recipe,userIngredients){

    const ingredient = calculateIngredientScore(recipe,userIngredients);

    const nutrition = nutritionScore(recipe);

    return ingredient*70 + nutrition*0.3;

}

function recommendRecipes(){
    const userIngredients=getUserIngredients();

    if(userIngredients.length===0){

    	alert("재료를 입력해주세요.");

    	return [];

    }

    let result = [];

    recipes.forEach(recipe=>{

        result.push({

            ...recipe,

            score:totalScore(recipe,userIngredients)

        });

    });

    result.sort((a,b)=>b.score-a.score);

    return result;
}

function missingIngredients(recipe,userIngredients){

    return recipe.ingredients.filter(item=>

        !userIngredients.includes(item)

    );

}

function displayRecipes(recipeList){
    
    const cards=document.querySelector(".cards");
    
    cards.innerHTML="";

    if(recipeList.length===0){

	cards.innerHTML=`

	<div style="
	padding:40px;
	text-align:center;
	font-size:22px;
	">

	😥 추천할 요리가 없습니다.

	</div>

	`;

return;

}
    recipeList.forEach(recipe=>{

        cards.innerHTML+=`

        <div class="card" onclick="showRecipe(${recipe.id})">

            
	    <img src="${recipe.image}"

             onerror="this.src='https://placehold.co/600x400?text=No+Image'">

            <div class="card-body">

                <div class="tag">

                ${recipe.difficulty}

                </div>

                <h3>${recipe.name}</h3>

                <p>

                일치율 ${Math.round(calculateIngredientScore(recipe,getUserIngredients())*100)}%

                <br>

                조리시간 ${recipe.time}분
		<br><br>

		<b>부족한 재료</b><br>

		${missingIngredients(recipe,getUserIngredients()).join(", ")}


                </p>

            </div>

        </div>

        `;

    });

}
document.getElementById("recommendBtn")
.addEventListener("click",()=>{

    const recommend = recommendRecipes();

    displayRecipes(recommend);

});

function filterDifficulty(level){

    const recommend = recommendRecipes();

    if(level==="전체"){

        displayRecipes(recommend);

        return;
    }

    displayRecipes(

        recommend.filter(r=>r.difficulty===level)

    );

}
document.querySelectorAll(".filter").forEach(btn=>{

    btn.addEventListener("click",()=>{

        filterDifficulty(btn.innerText);

    });

});

document.getElementById("recipeSearch")
.addEventListener("input",function(){

    const keyword=this.value.toLowerCase();

    const result=recommendRecipes().filter(recipe=>

        recipe.name.toLowerCase().includes(keyword)

    );

    displayRecipes(result);

});

document.getElementById("sortSelect")
.addEventListener("change",function(){

let result=recommendRecipes();

switch(this.value){

case "time":

result.sort((a,b)=>a.time-b.time);

break;

case "protein":

result.sort((a,b)=>

b.nutrition.protein-a.nutrition.protein);

break;

}

displayRecipes(result);

});

document.getElementById("ingredientInput")
.addEventListener("keypress",function(e){

if(e.key==="Enter"){

const loading=document.getElementById("loading");

loading.style.display="block";

setTimeout(()=>{

loading.style.display="none";

displayRecipes(recommendRecipes());

},800);

}

});