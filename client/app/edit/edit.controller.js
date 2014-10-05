'use strict';

angular.module('slackbotRemindersApp')
  .controller('EditList', function ($scope, $location, session, reminder) {
    var promise = reminder.getItems(session.getTeamName(), session.getToken());
    promise.then(function(items) {
      $scope.items = items;
    });
    
    $scope.teamLink = 'https://' + session.getTeamName() + '.slack.com';
    
    $scope.back = function() {
      $location.path('/');
    };
    
    $scope.setActive = function (item) {
      session.setSelectedItem(item);
    };
    
    $scope.isActive = function (item) {
      return item == session.getSelectedItem();
    };
  })
  .controller('EditDetails', function ($scope, session, reminder) {
    $scope.$watch(function () {
      return session.getSelectedItem();
    }, function (newVal, oldVal) {
      $scope.item = newVal;
    });
    
    $scope.errors = {};
    
    $scope.save = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        //reminder.saveItem($scope.item);
        alert('placeholder for item saved');
      }
    };
  });
