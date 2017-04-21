angular.module("takeaway", [
    'ngRoute',
    'cart',
    'Checkout'
])

.config(['$routeProvider', function ($routeProvider){
    $routeProvider.otherwise({
        redirectTo:'/cart'
    });
}])