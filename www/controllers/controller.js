var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

  var updateView = function() {
    $http({
      method: 'GET',
      url: '/employee'
    }).success(function(response) {
      $scope.employees = response.data.employees;
      $scope.employee = "";
    });
  };

  updateView();

  $scope.addEmployee = function() {
    console.log($scope.employee);
    $http({
      method: 'POST',
      url: '/employee',
      data: {
        employee: $scope.employee
      }
    }).success(function(response) {
      updateView();
    });
  };

  $scope.removeEmployee = function(id) {
    $http({
      method: 'DELETE',
      url: '/employee/' + id.toString()
    }).success(function(response) {
      updateView();
    });
  };

  $scope.editEmployee = function(id) {
    $http({
      method: 'GET',
      url: '/employee/'+id.toString(),
    }).success(function(response) {
      $scope.employee = response.data.employee[0];
    });
  };

  $scope.updateEmployee = function() {
    $http({
      method: 'PUT',
      url: '/employee',
      data: {
        employeeId: $scope.employee._id,
        employee: $scope.employee
      }
    }).success(function(response) {
      updateView();
    });
  };
}]);