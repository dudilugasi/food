var app = angular.module('food',[]);

var ingredients = [
        {category: "VEGETABLES", ingredients:[
            {name: "Artichoke", checked: false},
            {name: "Arugula", checked: false},
            {name: "Asparagus", checked: false},
            {name: "Avocado", checked: false},
            {name: "Beet Green" , checked: false},
            {name: "Bell Pepper" , checked: false},
            {name: "Bok Choy" , checked: false},
            {name: "Broccoli" , checked: false},
            {name: "Broccoli Rabe" , checked: false},
            {name: "Brussels Sprouts" , checked: false},
            {name: "Cabbage" , checked: false},
            {name: "Carrots" , checked: false},
            {name: "Celery" , checked: false},
            {name: "Collards" , checked: false},
            {name: "Cucumbers" , checked: false},
            {name: "Eggplant" , checked: false},
            {name: "Garlic" , checked: false},
            {name: "Green Bean" , checked: false},
            {name: "Jerusalem Artichoke" , checked: false},
            {name: "Kale" , checked: false},
            {name: "Mushrooms" , checked: false},
            {name: "Olives" , checked: false},
            {name: "Onions" , checked: false},
            {name: "Parsnip" , checked: false},
            {name: "Peppers" , checked: false},
            {name: "Pumpkin" , checked: false},
            {name: "Radish" , checked: false},
            {name: "Romaine Lettuce" , checked: false},
            {name: "Sea Vegetable" , checked: false},
            {name: "Spinach" , checked: false},
            {name: "Squash" , checked: false},
            {name: "Tomatoes" , checked: false},
            {name: "Turnip Greens" , checked: false},
            {name: "Watercress" , checked: false},
            {name: "Wheat Grass" , checked: false},
            {name: "Brown Rice" , checked: false},
            {name: "Wild Rice" , checked: false},
            {name: "Beans" , checked: false},
            {name: "Sweet Potatoes" , checked: false},
            {name: "Quinoa" , checked: false}
        ]},
        {category: "DAIRY", ingredients:[
            {name: "Cows Milk",checked: false},
            {name: "Cows Cheese",checked: false},
            {name: "Cows Amasai", checked: false},
            {name: "Goats Milk", checked: false},
            {name: "Goats Cheese", checked: false},
            {name: "Kefir", checked: false},
            {name: "Sheep Cheese", checked: false},
            {name: "Sheep Yogurt", checked: false}
        ]},
        {category: "MEAT", ingredients:[
            {name: "Beef", checked: false},
            {name: "Bison", checked: false},
            {name: "Chicken", checked: false},
            {name: "Duck", checked: false},
            {name: "Eggs", checked: false},
            {name: "Lamb", checked: false},
            {name: "Turkey", checked: false}
        ]},
        {category: "FISH", ingredients:[
            {name: "Anchovies",checked: false},
            {name: "Bass",checked: false},
            {name: "Cod",checked: false},
            {name: "Grouper",checked: false},
            {name: "Haddock",checked: false},
            {name: "Halibut",checked: false},
            {name: "Herring",checked: false},
            {name: "Mackerel",checked: false},
            {name: "Mahi Mahi",checked: false},
            {name: "Red Snapper",checked: false},
            {name: "Salmon",checked: false},
            {name: "Sardines",checked: false},
            {name: "Seabass",checked: false},
            {name: "Trout",checked: false},
            {name: "Tuna",checked: false},
            {name: "Walleye",checked: false}

        ]}
    ];

var categoriesHide = [],ingredientsArray = [];
for (var i = 0 ; i < ingredients.length ; i++){
    categoriesHide.push(true);
}
categoriesHide[0] = false;

app.controller('controller',function($scope){

    //index of the current page
    var currentPage = 0;

    //the ingredients data
    $scope.ingredients = ingredients;

    //the array of the pages to know if to hide them or not
    $scope.categoriesHide = categoriesHide;

    //the category of the current page
    $scope.category = ingredients[currentPage].category;

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
        $scope.category = ingredients[currentPage].category;
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
        $scope.category = ingredients[currentPage].category;
    };

    //marks the current category page on the dots
    $scope.markCurrent = function(index){
        if (index == currentPage) {
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

    $scope.test = function() {
        alert(ingredientsArray);
    }


});