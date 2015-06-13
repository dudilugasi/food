var app = angular.module('food',['ngAnimate']);

var ingredients = {items: []};

var user = {id: 1,likes: []};

//before the app start we get the ingredient from the web server
//each item will represent a page of category that will be hidden with the hide directive
app.run(function($http){
    $http.get("http://localhost:8000/get-ingredients").success(function(data){
        ingredients.items = data;
        angular.forEach(ingredients.items,function(item){
            item.hide = true;
        });
        ingredients.items[0].hide = false;
    });
    $http.get("http://localhost:8000/get-likes?user_id=" + user.id).success(function(data){
        user.likes = data;
    });
});

//this array will hold the ingredients the user do not want in his food
var ingredientsArray = [];


//main controller of the application
app.controller('controller',function($scope,$http){
    //app user
    $scope.user = user;

    //title of the header
    $scope.headerTitle = "FoodStuffs";

    //will hide/show the categories page
    $scope.foodstuffsHide = false;

    //will hide/show the recipes page
    $scope.recipesSectionHide = true;

    //the day that is displayed
    $scope.currentDay = 0;

    //hold the data recipes
    $scope.recipes = {days : [
        {name:"Su",meals: []},
        {name:"Mo",meals: []},
        {name:"Tu",meals: []},
        {name:"We",meals: []},
        {name:"Th",meals: []},
        {name:"Fr",meals: []},
        {name:"Sa",meals: []}
    ]};

    //index of the current page in the category page
    $scope.currentPage = 0;

    //the ingredients data
    $scope.ingredients = ingredients;

    //when the left button is pressed
    //we hide the current page and show the previous one
    $scope.goLeft = function() {
        $scope.ingredients.items[$scope.currentPage].hide = true;
        $scope.currentPage--;
        if($scope.currentPage < 0){
            $scope.currentPage = $scope.ingredients.items.length - 1 ;
            $scope.ingredients.items[$scope.currentPage].hide = false;
        }
        else{
            $scope.ingredients.items[$scope.currentPage].hide = false;
        }
    };

    //when the right button is pressed
    //we hide the current page and show the next one
    $scope.goRight = function() {
        $scope.ingredients.items[$scope.currentPage].hide = true;
        $scope.currentPage++;
        if ($scope.currentPage >= $scope.ingredients.items.length) {
            $scope.ingredients.items[0].hide = false;
            $scope.currentPage = 0;
        }
        else {
            $scope.ingredients.items[$scope.currentPage].hide = false;
        }
    };

    //if the switched is pressed the item name will be added or removed from the array
    $scope.changeArray = function(name,checked) {
        if (checked) {
            ingredientsArray.push(name);
        }
        if (!checked) {
            ingredientsArray.splice(ingredientsArray.indexOf(name),1);
        }
    };

    //get the index of the day, hide the previous day and display the current day
    $scope.selectDay = function(index) {
        $scope.recipes.days[$scope.currentDay].hide = true;
        $scope.recipes.days[index].hide = false;
        $scope.currentDay = index;
    };

    //when clicking the recipes page
    // the app will get from the WS the recipes that match the ingredients sent
    //than on success the data will be divided to days
    //each day will receive three random recipes to each meal
    //each meal will get directives to hide certain objects
    //the days will be hidden except one
    $scope.recipesClick = function() {
        $http({
            url: "http://localhost:8000/get-recipes",
            method: "GET",
            params: {ingredients : ingredientsArray}
        }).success(function(data) {

            var breakfastArray = [];
            var lunchArray = [];
            var dinnerArray = [];
            var dataSize = data.length;
            for(var i = 0 ; i< dataSize; i++){
                if(data[i].meal == "breakfast"){breakfastArray.push(data[i]);}
                if(data[i].meal == "lunch"){lunchArray.push(data[i]);}
                if(data[i].meal == "dinner"){dinnerArray.push(data[i]);}
            }

            for (i = 0 ; i < 7 ; i++){
                $scope.recipes.days[i].hide = true;
                $scope.recipes.days[i].meals[0] = breakfastArray[Math.floor(Math.random() * breakfastArray.length)];
                $scope.recipes.days[i].meals[1] = lunchArray[Math.floor(Math.random() * lunchArray.length)];
                $scope.recipes.days[i].meals[2] = dinnerArray[Math.floor(Math.random() * dinnerArray.length)];
                for (var j = 0 ; j < 3 ; j++) {
                    $scope.recipes.days[i].meals[j].pressedDirections = false;
                    $scope.recipes.days[i].meals[j].pressedIngredients = false;
                    $scope.recipes.days[i].meals[j].likedMeal = $scope.user.likes.indexOf($scope.recipes.days[i].meals[j].name) > -1;
                }
            }

            $scope.recipes.days[0].hide = false;
            $scope.selectDay(0);

        });
        $scope.headerTitle = "Recipes";
        $scope.foodstuffsHide = true;
        $scope.recipesSectionHide = false;
        $('nav').hide('slide',300);
    };

    //to return to the category menu
    $scope.foodstuffsClick = function() {
        $scope.headerTitle = "FoodStuffs";
        $scope.foodstuffsHide = false;
        $scope.recipesSectionHide = true;
        $('nav').hide('slide',300);
    };


    //if the user press ingredients or direction button:
    //the class of the pressed button and the recipe image will be set accordingly
    //the other bottom will be hidden or shown accordingly
    $scope.ingredientsClick = function(meal) {
        meal.pressedIngredients = !meal.pressedIngredients;
        if (meal.pressedDirections) {
            meal.pressedDirections = !meal.pressedDirections;
        }
    };
    $scope.directionsClick = function(meal) {
        meal.pressedDirections = !meal.pressedDirections;
        if (meal.pressedIngredients) {
            meal.pressedIngredients = !meal.pressedIngredients;
        }
    };


    //if the user like a meal
    //the name of the meal will be added to the liked array
    //and the db will be updated
    $scope.likeAMeal = function(meal) {
        var mealNameIndex = $scope.user.likes.indexOf(meal.name);
        if (mealNameIndex > -1 ) {
            meal.likedMeal = false;
            $scope.user.likes.splice(mealNameIndex,1);
        }
        else {
            meal.likedMeal = true;
            $scope.user.likes.push(meal.name);
        }
        console.log($scope.user.likes);
        $http({
            url: "http://localhost:8000/add-likes",
            method: "GET",
            params: {user_id: $scope.user.id, likes: $scope.user.likes}
        }).success(function(data) {});
    };
});
