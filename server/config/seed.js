/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Reminder = require('../api/reminder/reminder.model');

Reminder.find({}).remove(function() {
  var time1 = new Date();
  time1.setHours(11);
  time1.setMinutes(45);
  
  var time2 = new Date();
  time2.setHours(14);
  time2.setMinutes(10);
  
  Reminder.create({
    teamName: 'test',
    token: 'a',
    title: 'Hardcoded Example 1',
    message: 'This is only a test',
    channel: '#test',
    isActive: true,
    isRepeating: true,
    triggerDate: null,
    triggerTime: time1,
    daysOfWeek: [1, 2]
  },{
    teamName: 'test',
    token: 'a',
    title: 'Hardcoded Example 2',
    message: 'This is only a test for example 2',
    channel: '#test',
    isActive: false,
    isRepeating: true,
    triggerDate: null,
    triggerTime: time1,
    daysOfWeek: [1, 2]
  },{
    teamName: 'test',
    token: 'a',
    title: 'Hardcoded Example 3',
    message: 'Happy Halloween',
    channel: '#test',
    isActive: true,
    isRepeating: false,
    triggerDate: '10/31/2014',
    triggerTime: time1,
    daysOfWeek: null
  },{
    teamName: 'test',
    token: 'a',
    title: 'Time Bandits Daily Scrum',
    message: 'Time Bandits - Scrum in 2 minutes! https://zoom.us/j/368835486',
    channel: '@joe',
    isActive: true,
    isRepeating: false,
    triggerDate: '10/5/2014',
    triggerTime: time2,
    daysOfWeek: null
  });
});