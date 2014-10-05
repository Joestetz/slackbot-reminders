'use strict';

angular.module('slackbotRemindersApp')
  .factory('session', function () {
    var teamName = null;
    var token = null;
    var selectedItem = null;

    // Public API here
    return {
      getTeamName: function () {
        return this.teamName;
      },
      setTeamName: function (name) {
        this.teamName = name;
      },
      getToken: function () {
        return this.token;
      },
      setToken: function (token) {
        this.token = token;
      },
      getSelectedItem: function () {
        return this.selectedItem;
      },
      setSelectedItem: function (item) {
        this.selectedItem = item;
      }
    };
  });
