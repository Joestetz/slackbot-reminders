'use strict';

angular.module('slackbotRemindersApp')
  .controller('EditList', function ($scope, $location, session, Reminder) {
    var getItems = function () {
      $scope.items = Reminder.query({
        name: session.getTeamName(),
        token: session.getToken()
      });
    };
    getItems();
  
    $scope.$watch(function () {
      return session.getSelectedItem();
    }, function (newVal, oldVal) {
      getItems();
    });
    
    $scope.teamLink = 'https://' + session.getTeamName() + '.slack.com';
    
    $scope.back = function() {
      $location.path('/');
    };
    
    $scope.setActive = function (item) {
      session.setSelectedItem(item);
    };
    
    $scope.isActive = function (item) {
      var comp = session.getSelectedItem();
      return (!item && !comp) || (item && comp && item._id == comp._id);
    };
  })
  .controller('EditDetails', function ($scope, session, Reminder) {
    $scope.$watch(function () {
      return session.getSelectedItem();
    }, function (newVal, oldVal) {
      $scope.item = newVal;
    });
    
    $scope.errors = {};
    
    $scope.save = function(form) {
      $scope.submitted = true;

      $scope.checkValidity(form);
      
      if(form.$valid) {
        if (!$scope.item._id) {
          $scope.item.teamName = session.getTeamName();
          $scope.item.token = session.getToken();
          Reminder.save($scope.item, function(newItem) {
            session.setSelectedItem(newItem);
          });
        } else {
          $scope.item.$update();
        }
      }
    };
    
    $scope.remove = function () {
      $scope.item.$delete();
      session.setSelectedItem(null);
    }
    
    // datepicker
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.format = 'shortDate';
    
    // Days of week
    $scope.toggleDay = function (day, form) {
      if($scope.item.daysOfWeek == null) {
        $scope.item.daysOfWeek = [];
      }
      
      var idx = $scope.item.daysOfWeek.indexOf(day);

      // is currently selected
      if (idx > -1) {
        $scope.item.daysOfWeek.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.item.daysOfWeek.push(day);
      }
      
      // reset validity
      if($scope.submitted) {
        $scope.checkValidity(form);
      }
    };
    
    $scope.daysOfWeek = [{
      dayValue: 0,
      shortName: 'Su',
      longName: 'Sunday'
    },{
      dayValue: 1,
      shortName: 'Mo',
      longName: 'Monday'
    },{
      dayValue: 2,
      shortName: 'Tu',
      longName: 'Tuesday'
    },{
      dayValue: 3,
      shortName: 'We',
      longName: 'Wednesday'
    },{
      dayValue: 4,
      shortName: 'Th',
      longName: 'Thursday'
    },{
      dayValue: 5,
      shortName: 'Fr',
      longName: 'Friday'
    },{
      dayValue: 6,
      shortName: 'Sa',
      longName: 'Saturday'
    }];
    
    $scope.checkValidity = function (form) {
      form.daysValidate.$setValidity('groupRequired', !$scope.item.isRepeating || 
        ($scope.item != null 
        && $scope.item.daysOfWeek != null 
        && $scope.item.daysOfWeek.length != 0 
        && $scope.item.isRepeating));
        
      form.date.$setValidity('requiredSingle', $scope.item.isRepeating || (!form.date.$error.date && form.date.$viewValue != null));
    };
  });
