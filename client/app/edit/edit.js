'use strict';

angular.module('slackbotRemindersApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/edit', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl'
      });
  });
