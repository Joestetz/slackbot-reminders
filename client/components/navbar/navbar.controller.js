'use strict';

angular.module('slackbotRemindersApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': './'
    },{
      'title': 'About',
      'link': './about'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      if(route[0] == '.') route = route.slice(1);
      return route === $location.path();
    };
  });