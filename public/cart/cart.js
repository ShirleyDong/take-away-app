angular.module('cart', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider){
        $routeProvider.when('/cart', {
            templateUrl: 'public/cart/cart.html',
            Controller: 'CartCtrl'
        });
    }])
.controller('CartCtrl',['$scope','$http','CommonProp',function ($scope,$http,CommonProp) {


	$scope.shopData = CommonProp.getItems();
	if(!$scope.shopData){
			$http.get('public/list.json').then(function(response){
		$scope.shopData = response.data;

	});
	}

	$scope.pricData = CommonProp.getPric();
	if(!$scope.pricData){
			$http.get('public/meal.json').then(function(response){
		$scope.pricData = response.data;

	});
	}

	$scope.locData = CommonProp.getLoc();
	if(!$scope.locData){
			$http.get('public/meal.json').then(function(response){
		$scope.locData = response.data;

	});
	}

	$scope.mealData = CommonProp.getContent();
	if(!$scope.mealData){
			$http.get('public/meal.json').then(function(response){
		$scope.mealData = response.data;

	});
	}

	$scope.total = function() {
	    var t = 0;
	    var a = 0;
	    var b = 0;
	 
	    for (var k in $scope.shopData) {
	        a += parseFloat($scope.shopData[k].selected);
	    }

	    for (var j in $scope.mealData) {
	        b += parseFloat($scope.mealData[j].selected);
	    }

	    t = a + b;

	    CommonProp.setTotal(t);

	 	return CommonProp.getTotal();	 
	}

	$scope.saving = function() {
	    var n = 0;
	    var x = 0;
	    var y = 0;

	    for (var k in $scope.pricData) {
	        x = parseFloat($scope.pricData[k]);
	    }

	    for (var j in $scope.locData) {
	        y= parseFloat($scope.locData[j]);
	    }

	    t = y  - x;



	    CommonProp.setSaving(n);

	 	return CommonProp.getSaving();	 
	}


	$scope.$watch('shopData',function(){
		CommonProp.setItems($scope.shopData);
	})

	$scope.$watch('mealData',function(){
		CommonProp.setContent($scope.mealData);
	})


}])

.directive('checkList', function(){
	return{
		restrict: 'E',
		scope:{
			option: '=',
			name: '=',
			selected: '='
		},
        template: function(elem, attrs) {
            return '<div class="panel-body">\
                    <div class="radio" ng-repeat="i in option">\
                        <label><input type="radio" name="{{name}}" ng-value = "{{i.price}}" ng-model = "$parent.selected">{{i.size}} Rs.{{i.price}}</label>\
                    </div>\
                </div>'
		}
	};
})

.service('CommonProp',function(){
	var items = '';
	var Total = 0;
	var content = '';
	var saving = 0;
	var pric = '';
	var loc = '';
	return{
		getPric: function(){
			return pric;
		},
		setPric: function(value){
			pric = value;
		},
		getLoc: function(){
			return loc;
		},
		setLoc: function(value){
			loc = value;
		},
		getSaving: function(){
			return saving;
		},
		setSaving: function(value){
			saving = value;
		},
		getContent: function(){
			return content;
		},
		setContent: function(value){
			content = value;
		},
		getItems: function(){
			return items;
		},
		setItems: function(value){
			items = value;

		},
		getTotal: function(){
			return Total;
		},
		setTotal: function(value){
			Total = value;
		}

	} 





})