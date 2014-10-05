'use strict';

angular.module('slackbotRemindersApp')
  .factory('reminder', function ($q) {
    // Public API here
    return {
      getItems: function (name, token) {
        // TODO: replace this functionality and hardcoded items array with DB fetch
        var myItems = [{
          title: 'Hardcoded Example 1',
          message: 'This is only a test',
          channel: '#test',
          isActive: true,
          isRepeating: true,
          triggerDate: null,
          triggerTime: '11:45 PM EST',
          daysOfWeek: [1, 2]
        },{
          title: 'Hardcoded Example 2',
          message: 'This is only a test for example 2',
          channel: '#test',
          isActive: false,
          isRepeating: true,
          triggerDate: null,
          triggerTime: '11:45 PM EST',
          daysOfWeek: [1, 2]
        },{
          title: 'Hardcoded Example 3',
          message: 'Happy Halloween',
          channel: '#test',
          isActive: true,
          isRepeating: false,
          triggerDate: '10/31/2014',
          triggerTime: '11:45 PM EST',
          daysOfWeek: null
        }];
        
        var deferred = $q.defer();
        
        deferred.resolve(myItems);
  
        return deferred.promise;
      }
    };
  });
