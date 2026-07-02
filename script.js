function showRecipe(id){

    const recipe = recipes.find(r=>r.id===id);

    document.getElementById("modalTitle").innerText=recipe.name;

    document.getElementById("modalImage").src=recipe.image;

    document.getElementById("modalDifficulty").innerText=recipe.difficulty;

    document.getElementById("modalTime").innerText=recipe.time;

    document.getElementById("modalKcal").innerText=recipe.nutrition.kcal;

    let ingredients="";

    recipe.ingredients.forEach(item=>{

        ingredients+=`<li>${item}</li>`;

    });

    document.getElementById("modalIngredients").innerHTML=ingredients;

    let steps="";

    recipe.steps.forEach(step=>{

        steps+=`<li>${step}</li>`;

    });

    document.getElementById("modalSteps").innerHTML=steps;

    document.getElementById("nutritionBox").innerHTML=`

    <div class="nutri">

    단백질 ${recipe.nutrition.protein}g

    <div class="nutriBar">

    <div class="nutriFill"

    style="width:${recipe.nutrition.protein}%">

    </div>

    </div>

    </div>

    <div class="nutri">

    탄수화물 ${recipe.nutrition.carb}g

    <div class="nutriBar">

    <div class="nutriFill"

    style="width:${recipe.nutrition.carb}%">

    </div>

    </div>

    </div>

    <div class="nutri">

    지방 ${recipe.nutrition.fat}g

    <div class="nutriBar">

    <div class="nutriFill"

    style="width:${recipe.nutrition.fat}%">

    </div>

    </div>

    </div>

    `;

    document.getElementById("recipeModal").style.display="block";

}

document.querySelector(".close").onclick=function(){

    document.getElementById("recipeModal").style.display="none";

}

window.onclick=function(event){

    if(event.target==document.getElementById("recipeModal")){

        document.getElementById("recipeModal").style.display="none";

    }

}

async function searchRecipe(){

    const ingredient =
    document.getElementById("ingredient").value;

    const url =
    `https://openapi.foodsafetykorea.go.kr/api/keyId/serviceId/dataType/startIdx/endIdx?ingredients=${ingredient}&apiKey=c3e54af0e795400d89e4`;

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

}
