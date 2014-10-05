'use strict';

angular.module('slackbotRemindersApp')
  .factory('Reminder', function ($resource) {
    return $resource('/api/reminders/:id', { id: '@_id' }, {
      update: { method: 'PUT' }
    });
  });
