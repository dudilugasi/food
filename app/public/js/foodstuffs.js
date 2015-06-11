var app = angular.module('food',[]);

var ingredients = {items: []};

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
});

//this array will hold the ingredients the user do not want in his food
var ingredientsArray = [];


//main controller of the application
app.controller('controller',function($scope,$http){

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

    //marks the current category page on the dots
    $scope.markCurrent = function(index){
        if (index == $scope.currentPage) {
            return "coloredDot";
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

    //returned a class the mark the current day
    $scope.markCurrentDay = function(index) {
        if (index == $scope.currentDay) {
            return "currentDay";
        }
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
                    $scope.recipes.days[i].meals[j].hideDirections = true;
                    $scope.recipes.days[i].meals[j].hideIngredients = true;
                    $scope.recipes.days[i].meals[j].imageClass = "";
                    $scope.recipes.days[i].meals[j].pressedBtnIngredient = "";
                    $scope.recipes.days[i].meals[j].pressedBtnDirection = "";
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
    $scope.showBottomClick = function(num,i,j) {
        switch (num){
            //user pressed ingredients button
            case 1:
                if($scope.recipes.days[i].meals[j].hideIngredients == false){
                    $scope.recipes.days[i].meals[j].hideIngredients = true;
                    $scope.recipes.days[i].meals[j].imageClass = "";
                    $scope.recipes.days[i].meals[j].pressedBtnIngredient = "";
                }else {
                    $scope.recipes.days[i].meals[j].hideIngredients = false;
                    $scope.recipes.days[i].meals[j].imageClass = "closedImage";
                    $scope.recipes.days[i].meals[j].pressedBtnIngredient = "pressed-btn";
                    $scope.recipes.days[i].meals[j].pressedBtnDirection = "";

                }
                $scope.recipes.days[i].meals[j].hideDirections = true;
                break;

            //user pressed directions button
            case 2:
                if($scope.recipes.days[i].meals[j].hideDirections == false){
                    $scope.recipes.days[i].meals[j].hideDirections = true;
                    $scope.recipes.days[i].meals[j].imageClass = "";
                    $scope.recipes.days[i].meals[j].pressedBtnDirection = "";
                }
                else{
                    $scope.recipes.days[i].meals[j].hideDirections = false;
                    $scope.recipes.days[i].meals[j].imageClass = "closedImage";
                    $scope.recipes.days[i].meals[j].pressedBtnIngredient = "";
                    $scope.recipes.days[i].meals[j].pressedBtnDirection = "pressed-btn";
                }
                $scope.recipes.days[i].meals[j].hideIngredients = true;
                break;
        }
    }
});