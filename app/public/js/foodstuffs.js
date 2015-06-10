var app = angular.module('food',[]);

var ingredients = {items: []};

app.run(function($http){
    $http.get("http://localhost:8000/get-ingredients").success(function(data){
        ingredients.items = data;
        angular.forEach(ingredients.items,function(item){
            item.hide = true;
        });
        ingredients.items[0].hide = false;
    });
});

var ingredientsArray = [];

app.controller('controller',function($scope){


    //index of the current page
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

    $scope.recipesClick = function() {
        $scope.foodstuffsHide = true;
        $('nav').hide('slide',300);
    };

    $scope.foodstuffsClick = function() {
        $scope.foodstuffsHide = false;
        $('nav').hide('slide',300);
    };
});