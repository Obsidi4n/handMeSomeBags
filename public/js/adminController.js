var authModule = angular.module('Administration', [])

.controller('AdminController', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window){
    
    $scope.requests = [];

    $scope.users = [];

    $scope.getUsers = function() {
        
        $http.get('/restricted/getAllUsers')
            .success(function(users) {
                angular.forEach(users, function(user){ 
                    user.dbUpdated = true;
                });
                $scope.users = users;                
                $scope.usersQueried = true;
            })
            .error(function(data) {
                console.log('Error in retrieving users:');
                console.log(data);
            });

    };

    $scope.getRequests = function() {
        
        $http.get('/restricted/getAllRequests')
            .success(function(request) {
                // angular.forEach(users, function(user){ 
                //     console.log(user);
                // });
                $scope.requestQueried = true;
                $scope.requests = request;
            })
            .error(function(data) {
                console.log('Error in retrieving requests:');
                console.log(data);
            });

    };

    $scope.switchView = function() {
        
        //TODO Need angular running on this to switch views

    };
    $scope.logout = function(){

        //TODO Get a route in here
        $window.location.href = '/';
    };

    $scope.updateFlag = function(i,flag){
        $scope.users[i][flag] = !$scope.users[i][flag];
        $scope.users[i].dbUpdated = false;
    };

    $scope.updateDB = function(i){
        console.log($scope.users[i]);
        if (!$scope.users[i].dbUpdated)
        {
            $http.post('/restricted/manualVerification',
                    {
                        username: $scope.users[i].username, 
                        verification_email: $scope.users[i].verification_email,
                        verification_phone: $scope.users[i].verification_phone
                    })
                .success(function(request) {
                    $scope.users[i].dbUpdated = true;
                })
                .error(function(err) {
                    console.log(err);
                });
        }
    }
    console.log('Administration ready');
}]);