'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReminderSchema = new Schema({
  teamName: { type: String, required: true },
  token: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  channel: { type: String, required: true },
  isActive: Boolean,
  isRepeating: Boolean,
  triggerDate: Date,
  triggerTime: { type: Date, required: true },
  daysOfWeek: [Number]
});

module.exports = mongoose.model('Reminder', ReminderSchema);