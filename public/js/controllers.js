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
        // $scope.dataLoading = true;
        $http.post('/public/login', {username: $scope.username, password: $scope.password})
            .success(function(data) {
                $window.sessionStorage.token = data.token;
                $window.sessionStorage.expires = data.expires;
                $window.sessionStorage.user = data.user;
                $window.location.href = data.location+'?token='+data.token;
            })
            .error(function(data) {
                $scope.form.$setPristine();
                $scope.dataLoading = false;
                $scope.error = data['error'];
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
        // $scope.dataLoading = true;
        $http.post('/public/register', 
            {   username: $scope.username, 
                password: $scope.password,
                email: $scope.email,
                contact: $scope.contact
            })
            .success(function(data) {
                $window.sessionStorage.token = data.token;
                $window.sessionStorage.expires = data.expires;
                $window.sessionStorage.user = data.user;
                $window.location.href = data.location+'?token='+data.token;
            })
            .error(function(data) {
                console.log('Error in registering: '+ data);
                $scope.form.$setPristine();
                $scope.dataLoading = false;
                $scope.error = data['error'];
            });
    };
    console.log('RegisterController ready');
}]);