const searchInput = document.querySelector('.searchInput');
const results = document.querySelector('.results')
const randomMeal = document.querySelector('.randomMeal')

let search ='';

const fetchSearch = async(url) => {
    meals = await fetch (`https://www.themealdb.com/api/json/v1/1/${url}`)
    .then(res => res.json())
    .then(res => res.meals)
    console.log(meals)
}

const searchDisplay = async() => {
    await fetchSearch(search);

    if(meals == null) {
        results.innerHTML = '<span class="noResult"> Aucun resultat</span>';
    }

    results.innerHTML = (
        meals.map(meal => (
            `
            <div class="searchContainer">
            <h2>${meal.strMeal}</h2>
            <div class="infos">
                <div>origine : ${meal.strArea} </div>
                <div>catégorie : ${meal.strCategory}</div>
            </div>
            <img src='${meal.strMealThumb}' /> </br>
            <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></ i></a>

            </div>
            `

        )).join('')
    )
};

searchInput.addEventListener('input', (e) => {
    console.log(e.target.value)
    search = `search.php?s=${e.target.value}`
    searchDisplay();
})


fetchSearch()

// RANDOM MEAL
const randomMealDisplay = async() => {
    await fetchSearch('random.php')

    results.innerHTML = (
        meals.map(meal => (
            `
            <div class="randomContainer">
            <h2>${meal.strMeal}</h2>
            <div class="infos">
                <div>origine : ${meal.strArea} </div>
                <div>catégorie : ${meal.strCategory}</div>
            </div>
            <img src='${meal.strMealThumb}' /> </br>
            <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
            `


        ))
    );
};

randomMeal.addEventListener('click', randomMealDisplay);
randomMealDisplay();
// themealdb.com
// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// https://www.themealdb.com/api/json/v1/1/random.php