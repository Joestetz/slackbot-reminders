'use strict';

var schedule = require('node-schedule');
var Slackbot = require('slackbot');
var Reminder = require('../api/reminder/reminder.model');

module.exports = function(app) {
  var slackbotTracker = [];
  
  var getJobCfg = function(reminder) {
    if (reminder.isRepeating) {
      return null;
    }
    
    return new Date(reminder.triggerDate.getFullYear(), reminder.triggerDate.getMonth(), 
      reminder.triggerDate.getDate(), reminder.triggerTime.getHours(), 
      reminder.triggerTime.getMinutes(), reminder.triggerTime.getSeconds());
  };
  
  var scheduleJob = function(jobCfg, slackbot, reminder) {
    var job = schedule.scheduleJob(jobCfg, function() {
      slackbot.send(reminder.channel, reminder.message, function(err, res, body) {
        if(err) return;
        console.log(body); 
      });
    });
    
    return job;
  };

  Reminder.find({}, function (err, reminders) {
    for(var i = 0; i < reminders.length; i++) {
      var reminder = reminders[i];
      console.log(reminder);
      var slackbot = new Slackbot(reminder.teamName, reminder.token);
      slackbotTracker.push({ 
        obj: slackbot,
        name: reminder.teamName,
        token: reminder.token
      });
      
      var jobCfg = getJobCfg(reminder);
      var job = scheduleJob(jobCfg, slackbot, reminder);
    }
  });
};