'use strict';

angular.module('slackbotRemindersApp')
  .controller('MainCtrl', function ($scope, $http, $location, session) {
    $scope.errors = {};
    
    $scope.go = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        session.setTeamName($scope.teamName);
        session.setToken($scope.token);
        $location.path('/edit');
      }
    };
  });