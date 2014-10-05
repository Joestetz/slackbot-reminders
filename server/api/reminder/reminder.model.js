'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReminderSchema = new Schema({
  teamName: String,
  token: String,
  title: String,
  message: String,
  channel: String,
  isActive: Boolean,
  isRepeating: Boolean,
  triggerDate: Date,
  triggerTime: Date,
  daysOfWeek: [Number]
});

module.exports = mongoose.model('Reminder', ReminderSchema);