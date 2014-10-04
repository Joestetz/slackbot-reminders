'use strict';

angular.module('slackbotRemindersApp')
  .controller('MainCtrl', function ($scope, $http, $location) {
    $scope.errors = {};
    
    $scope.go = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        $location.path('/edit?name=' + $scope.teamName + '&token=' + $scope.teamName);
      }
    };
  });