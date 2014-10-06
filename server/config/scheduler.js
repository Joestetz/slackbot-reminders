'use strict';

var schedule = require('node-schedule');
var Slackbot = require('slackbot');
var Reminder = require('../api/reminder/reminder.model');

var jobTracker = [];
  
var getJobCfg = function(reminder) {
  var timeCompontent = new Date(reminder.triggerTime);
  
  if (reminder.isRepeating) {
    var rule = new schedule.RecurrenceRule();
    rule.hour = timeCompontent.getHours();
    rule.minute = timeCompontent.getMinutes();
    rule.second = 0;
    
    if(reminder.daysOfWeek.length > 0) {
      rule.dayOfWeek = reminder.daysOfWeek;
    }
    
    return rule;
  }
  
  var dateCompontent = new Date(reminder.triggerDate);
  
  return new Date(dateCompontent.getFullYear(), dateCompontent.getMonth(), 
    dateCompontent.getDate(), timeCompontent.getHours(), 
    timeCompontent.getMinutes(), timeCompontent.getSeconds());
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

var isValidDate = function (reminder) {
  if (reminder.isRepeating) return true;
  
  var timeComponent = new Date(reminder.triggerTime);
  var sched = new Date(reminder.triggerDate);
  sched.setHours(timeComponent.getHours());
  sched.setMinutes(timeComponent.getMinutes());
  sched.setSeconds(timeComponent.getSeconds());
  
  var now = new Date();
  
  return sched > now;
};

var startup = function(app) {
  Reminder.find({}, function (err, reminders) {
    for(var i = 0; i < reminders.length; i++) {
      var reminder = reminders[i];
      console.log(reminder);
      
      add(reminder);
    }
  });
};

var add = function (reminder) {
  if (isValidDate(reminder) && reminder.isActive) {
    var slackbot = new Slackbot(reminder.teamName, reminder.token);
    var jobCfg = getJobCfg(reminder);
    var job = scheduleJob(jobCfg, slackbot, reminder);
    jobTracker.push({ 
      job: job,
      name: reminder.teamName,
      token: reminder.token,
      reminderId: reminder._id
    });
  }
};

var update = function (reminder) {
  remove(reminder);
  add(reminder);
};

var remove = function (reminder) {
  var idxToRemove = -1;
  for (var i = 0; i < jobTracker.length; i++) {
    var curTracker = jobTracker[i];
    if (curTracker.reminderId.toString() == reminder._id.toString()) {
      curTracker.job.cancel();
      idxToRemove = i;
    }
  }
  
  if(idxToRemove >= 0) jobTracker.splice(idxToRemove, 1);
};

module.exports = {
  startup: startup,
  add: add,
  update: update,
  remove: remove
};