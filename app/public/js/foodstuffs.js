var app = angular.module('food',[]);

var ingredients = {items: [
        {category: "VEGETABLES", ingredients:[
            {name: "Artichoke", checked: false},
            {name: "Arugula", checked: false},
            {name: "Asparagus", checked: false},
            {name: "Avocado", checked: false}
        ]},
        {category: "DAIRY", ingredients:[
            {name: "Cows Milk",checked: false},
            {name: "Cows Cheese",checked: false},
            {name: "Cows Amasai", checked: false}
        ]},
        {category: "MEAT", ingredients:[
            {name: "Beef", checked: false},
            {name: "Bison", checked: false},
            {name: "Chicken", checked: false},
            {name: "Duck", checked: false},
            {name: "Eggs", checked: false}
        ]},
        {category: "FISH", ingredients:[
            {name: "Anchovies",checked: false},
            {name: "Bass",checked: false},
            {name: "Cod",checked: false},
            {name: "Grouper",checked: false},
            {name: "Haddock",checked: false}
        ]}
    ]
};

var categoriesHide = [];
for (var i = 0 ; i < ingredients.items.length ; i++){
    categoriesHide.push(true);
}
categoriesHide[0] = false;
console.log(categoriesHide);

app.controller('controller',function($scope){
    var currentPage = 0;
    $scope.ingredients = ingredients;
    $scope.categoriesHide = categoriesHide;
    $scope.category = ingredients.items[currentPage].category;

    //when the left button is pressed
    //we hide the current page and show the previous one
    $scope.goLeft = function() {
        categoriesHide[currentPage] = true;
        currentPage--;
        if(currentPage < 0){
            currentPage = categoriesHide.length -1 ;
            categoriesHide[currentPage] = false;
        }
        else{
            categoriesHide[currentPage] = false;
        }
        $scope.category = ingredients.items[currentPage].category;
    };

    //when the left button is pressed
    //we hide the current page and show the next one
    $scope.goRight = function() {
        categoriesHide[currentPage] = true;
        currentPage++;
        if (currentPage >= categoriesHide.length) {
            categoriesHide[0] = false;
            currentPage = 0;
        }
        else {
            categoriesHide[currentPage] = false;
        }
        $scope.category = ingredients.items[currentPage].category;
    };

    $scope.markCurrent = function(index){
        if (index == currentPage) {
            return "coloredDot";
        }
    };

    $scope.toArray = function() {
        var ingredientsArr = [];
        var length = ingredients.items.length;
        for(var i = 0 ; i < length; i++) {
            var length2 = ingredients.items[i].ingredients.length;
            for (var j = 0 ; j < length2 ; j++) {
                if (ingredients.items[i].ingredients[j].checked) {
                    ingredientsArr.push(ingredients.items[i].ingredients[j].name);
                }
            }
        }
    }


});