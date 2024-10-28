let linksWidth = $('.links-container').innerWidth()
$('.open').click(function () {
    $(this).addClass('d-none')
    $('.close').removeClass('d-none')
    $('aside').animate({ left: `0px` })
    $('aside').css('z-index', 99999999999)
    $('.meals-links a').animate({ top: 0 }, 500)
})

$('.close').click(function () {
    $(this).addClass('d-none')
    $('.open').removeClass('d-none')
    console.log(linksWidth);
    $('aside').animate({ left: `-${linksWidth}px` })
    $('.meals-links a').animate({ top: 300 }, 500)
})

$('.search').click(function (event) {
    $('.open').removeClass('d-none')
    $('.close').addClass('d-none')
    $('.form').addClass('d-none')
    $('.soso').addClass('d-none')
    $('.food-details').addClass('d-none')
    $('.spinner-overlay').addClass('d-none')
    $('.inputs').removeClass('d-none').insertBefore('.soso')
    $('body').css('overflow', 'auto')
    event.preventDefault();
    $('.inputs').removeClass('d-none')
    $('aside').animate({ left: `-${linksWidth}px` })
});


async function foodCategory() {
  $('.spinner-overlay').removeClass('d-none')
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let response = await request.json()
    console.log(response.categories);
    displayFoodsCat(response.categories)
 $('.spinner-overlay').addClass('d-none');
}

// foodCategory()

function displayFoodsCat(array) {
    let cartona = ''
    for (i = 0; i < array.length; i++) {
        cartona += `<div class="col-md-3">
                  <div onclick="foodFilterByCategory('${array[i].strCategory}')" class="inner rounded-2 overflow-hidden position-relative">
                    <img src="${array[i].strCategoryThumb}" alt="" srcset="">
                    <div class="cat-info rounded-2 text-center position-absolute top-0 end-0 start-0 bottom-0">
                        <h3>${array[i].strCategory}</h3>
                        <p>${array[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                  </div>
               </div>`
    }
    $('.myRow').html(cartona)
}

$('.cat').click(function (event) {
    $('.open').removeClass('d-none')
    $('.close').addClass('d-none')
    $('.form').addClass('d-none')
    $('.soso').removeClass('d-none')
    $('.inputs').addClass('d-none')
    $('.food-details').addClass('d-none')
    $('body').css('overflow', 'auto')
    event.preventDefault()
    $('aside').animate({ left: `-${linksWidth}px` })
    foodCategory()
})

async function foodFilterByCategory(catName) {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`)
    let response = await req.json()
    console.log(response.meals);
    displayFoodItem(response.meals)
 $('.spinner-overlay').addClass('d-none');
}

function displayFoodItem(array2) {
    let cartona = ''
    for (i = 0; i < array2.length; i++) {
        cartona += `<div class="col-md-3">
                        <div onclick="mealDetails('${array2[i].strMeal}')" class="inner2 position-relative overflow-hidden">
                            <img src="${array2[i].strMealThumb}" class="rounded-2" alt="" srcset="">
                            <div class="cat-info rounded-2 position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center">
                                <h3 class="ps-1">${array2[i].strMeal}</h3>
                            </div>
                        </div>
                   </div>`
    }
    $('.myRow').html(cartona)
}

async function mealDetails(mealName) {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    let response = await req.json()
    console.log(response.meals[0])
    displayMealData(response.meals[0])
 $('.spinner-overlay').addClass('d-none')
}

function displayMealData(meal) {
    let ingredientsList = ''
    for (let i = 1; i <= 20; i++) {
        let measure = meal[`strMeasure${i}`]
        let ingredient = meal[`strIngredient${i}`]
        if (measure && ingredient) {
            ingredientsList += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`
        }
    }
    let tagsList = ''
    if (meal.strTags) {
        let tags = meal.strTags.split(',')
        console.log(tags)
        tags.forEach(tag => {
            tagsList += `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`
        })
    }
    let cartona = `
        <div class="col-md-4">
            <div class="inner3">
                <img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="" srcset="">
                <h2 class="text-white">${meal.strMeal}</h2>
            </div>
        </div>
        <div class="col-md-8">
            <div class="inner4 text-white mt-sm-2 mt-lg-0">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredientsList}</ul>
                <h3>Tags :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsList}</ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>  
        </div>`;

    $('body').css('overflow', 'hidden')
    $('.soso').addClass('d-none')
    $('.food-details').css('overflow', 'auto')
    $('.foodRow').html(cartona)
    $('.food-details').removeClass('d-none')
}

async function foodrandom() {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let response = await req.json()
    displayFoodItem(response.meals)
 $('.spinner-overlay').addClass('d-none')
}

foodrandom()

async function mealAreas() {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response = await req.json()
    console.log(response.meals)
    displayAreas(response.meals)
 $('.spinner-overlay').addClass('d-none')
}

function displayAreas(array3) {
    let cartona = ''
    for (let i = 0; i < array3.length; i++) {
        cartona += `<div class="col-md-3">
                    <div onclick="filteredByArea('${array3[i].strArea}')" class="inner5 d-flex flex-column justify-content-center align-items-center">
                        <i class="fa-solid fw-bold fa-house-laptop fa-4x"></i>
                        <h3 class="text-white">${array3[i].strArea}</h3>
                    </div>
               </div>`
    }
    $('.myRow').html(cartona)
}

$('.area').click(function (event) {
    $('.open').removeClass('d-none')
    $('.close').addClass('d-none')
    $('.form').addClass('d-none')
    $('.soso').removeClass('d-none')
    $('.inputs').addClass('d-none')
    $('.food-details').addClass('d-none')
    $('body').css('overflow', 'auto')
    event.preventDefault()
    $('aside').animate({ left: `-${linksWidth}px` })
    mealAreas()
})


async function filteredByArea(area) {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response = await req.json()
    console.log(response.meals)
    displayFoodItem(response.meals)
 $('.spinner-overlay').addClass('d-none')
}


async function mealIngredient() {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let response = await req.json()
    console.log(response.meals)
    displayIngredient(response.meals.slice(0, 20))
 $('.spinner-overlay').addClass('d-none')
}


function displayIngredient(array4) {
    let cartona = ''
    for (let i = 0; i < array4.length; i++) {
        cartona += `<div class="col-md-3">
                    <div onclick="filteredByIngredient('${array4[i].strIngredient}')" class="inner6 d-flex flex-column text-center text-white justify-content-center align-items-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${array4[i].strIngredient}</h3>
                        <p>${array4[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
               </div>`
    }
    $('.myRow').html(cartona)
}

$('.ingredients').click(function (event) {
    $('.open').removeClass('d-none')
    $('.close').addClass('d-none')
    $('.form').addClass('d-none')
    $('.soso').removeClass('d-none')
    $('.inputs').addClass('d-none')
    $('.food-details').addClass('d-none')
    $('body').css('overflow', 'auto')
    event.preventDefault()
    $('aside').animate({ left: `-${linksWidth}px` })
    mealIngredient()
})

async function filteredByIngredient(Ingredient) {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
    let response = await req.json()
    console.log(response.meals);
    displayFoodItem(response.meals)
 $('.spinner-overlay').addClass('d-none')
}

$('.contact').click(function (event) {
    $('.open').removeClass('d-none')
    $('.close').addClass('d-none')
    event.preventDefault()
    $('aside').animate({ left: `-${linksWidth}px` })
    $('.form').removeClass('d-none')
    $('.food-details').addClass('d-none')
    $('.soso').addClass('d-none')
    $('.inputs').addClass('d-none')
    $('.spinner-overlay').addClass('d-none')
    $('body').css('overflow', 'auto')

})

$('.input1').on('input', function () {
    let son = $(this).val()
    console.log(son)
    mealSearch(son)
})

async function mealSearch(mealName) {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    let response = await req.json()
    console.log(response.meals);
    display2(response.meals)
 $('.spinner-overlay').addClass('d-none')
}


function display2(array5) {
    let cartona = '';
    if (array5 && array5.length > 0) {
        for (let i = 0; i < array5.length; i++) {
            cartona += `<div class="col-md-3">
                <div onclick="mealDetails('${array5[i].strMeal}')" class="inner2 position-relative overflow-hidden">
                    <img src="${array5[i].strMealThumb}" class="rounded-2" alt="">
                    <div class="cat-info rounded-2 position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center justify-content-center">
                        <h3>${array5[i].strMeal}</h3>
                    </div>
                </div>
            </div>`;
        }
        $('.myRow').html(cartona);
        $('.soso').removeClass('d-none')
    } 
    else {
        $('.myRow').html('')
        $('.soso').addClass('d-none')
        $('.spinner-overlay').addClass('d-none')
    }
}

$('.input2').on('input', function () {
    let letter = $(this).val()
    console.log(letter)
    mealSearchFirstLetter(letter)
})

async function mealSearchFirstLetter(mealletter) {
  $('.spinner-overlay').removeClass('d-none')
    let req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealletter}`)
    let response = await req.json()
    console.log(response.meals);
    display2(response.meals)
 $('.spinner-overlay').addClass('d-none')
}

$('.form input').on('input', function () {
    validateData(this);
    checkAllValid();
});

function validateData(element) {
    let regex = {
        userName: /^[A-Z][a-z]{3,8}$/,
        userEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        userPhone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        userAge: /^\S[0-9]{0,3}$/,
        userPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
        userRepassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/
    };

    let str = regex[element.id];
    if (str.test(element.value)) {
        $(element).next().addClass('d-none');
    } else {
        $(element).next().removeClass('d-none');
    }
}

function checkAllValid() {
    let allValid = true;

    $('.form input').each(function () {
        let element = $(this)[0];
        let regex = {
            userName: /^[A-Z][a-z]{3,8}$/,
            userEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            userPhone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            userAge: /^\S[0-9]{0,3}$/,
            userPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
            userRepassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/
        };

        let str = regex[element.id];
        if (!str.test(element.value)) {
            allValid = false;
            return false;
        }
    });

    if (allValid) {
        $('button').removeClass('disabled');
    } else {
        $('button').addClass('disabled');
    }
}
