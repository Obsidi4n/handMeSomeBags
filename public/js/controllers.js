var authModule = angular.module('Authentication', [])
/*
.config(['$routeProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'pages/login.html',
        controller: 'AuthController'
      })
      .when('/register', {
        templateUrl: 'pages/register.html',
        controller: 'RegisterController'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
}]);
*/
.controller('AuthController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window){
    
    $scope.login = function() {
        $scope.dataLoading = true;
        $http.post('/login', {user: $scope.username, pass: $scope.password})
            .success(function(data) {
                console.log(data);
                $window.location.href = data;
            })
            .error(function(data) {
                $scope.form.$setPristine();
                $scope.dataLoading = false;
                $scope.error = data;
            });
    };
    $scope.register = function(){
        console.log('Redirecting to register');
        $window.location.href = '/register';
    };
    console.log('AuthController ready');
}])

.controller('RegisterController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window){
    $scope.register = function(){
        $scope.dataLoading = true;
        $http.post('/register', 
            {   user: $scope.username, 
                pass: $scope.password,
                email: $scope.email,
                contact: $scope.contact
            })
            .success(function(data) {
                $scope.error = data;
                alert('Successfully added');
                $window.location.href = '/login';
            })
            .error(function(data) {
                $scope.form.$setPristine();
                $scope.dataLoading = false;
                $scope.error = data;
            });
    };
    console.log('RegisterController ready');
}]);