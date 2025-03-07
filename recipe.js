   const searchBox = document.querySelector('.searchBox');
   const searchBtn = document.querySelector('.searchBtn');
   const recipeContainer = document.querySelector('.recipe-container');
   const recipeDetailsContent = document.querySelector('.recipe-details-content');
   const recipeCloseBtn = document.querySelector('.close-recipe-btn');
   

   const fetchRecipes = async (query) => {
    recipeContainer.innerHTML=`<p class="errormsg">fetching recipes...</p>`
    try {
      
   
    const data =  await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
`);
  const response = await data.json();
  console.log(response);
  recipeContainer.innerHTML=""; 
  response.meals.forEach(meal => {
     const recipeDiv = document.createElement('div');
     recipeDiv.classList.add('recipe');
     recipeDiv.innerHTML = `
     <img src="${meal.strMealThumb}">
     <h3>${meal.strMeal}</h3>
     <p><span>${meal.strArea}</span></p>
     <p>Belongs to <span>${meal.strCategory} </span> category</p>
     `
      const Button = document.createElement('button');
      Button.textContent ="View Recipe";
      recipeDiv.appendChild(Button);
     Button.addEventListener('click',()=>{
      OpenRecipePopup(meal);
     });    

     recipeContainer.appendChild(recipeDiv);
  });
} catch (error) {
      recipeContainer.innerHTML=`<p class="errormsg">error while fetching recipes :(</p>`
}
  
   };
   const FetchIngridients =(meal)=>{
    
    let Ingridientlist = "";
    for (let i = 1; i <=20; i++) {
      const Ingridient = meal[`strIngredient${i}`];
      if (Ingridient) {
        const measure =meal[`strMeasure${i}`];
        Ingridientlist+=`<li>${measure} ${Ingridient}</li>`
      }
      else{
        break;
      }
      
    }
    return Ingridientlist;
    
   } ; 
   const OpenRecipePopup =(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 class="ingridientList">Ingridients:</h3>
    <ul class="ingridientList">${FetchIngridients(meal)}<//ul>
    <div class="recipeInstructions">
      <h3 class="ingridientList" >Instructions</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <h2 class="ingridientList"><a href="${meal.strYoutube}" target="_blank">whatch video</a></h2>
    `
    
    recipeDetailsContent.parentElement.style.display = "block";
   };
   
    recipeCloseBtn.addEventListener('click', ()=>{
      recipeDetailsContent.parentElement.style.display="none";
    });

    searchBox.addEventListener('click', () => {
      recipeDetailsContent.parentElement.style.display="none";
  });
   searchBtn.addEventListener('click', (e)=>{

   e.preventDefault();
   
    const seachInput = searchBox.value.trim();
    if (!seachInput) {
      recipeContainer.innerHTML =`<p class="errormsg">Type the meal in the search box :)</p>`;
      return;
     } 

  fetchRecipes(seachInput);

   } );
