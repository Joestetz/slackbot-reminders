'use strict';

var _ = require('lodash');
var Reminder = require('./reminder.model');

// Get list of reminders
exports.index = function(req, res) {
  if(!req.query.name) {
    return res.status(500).json({ error: 'Team Name is required' });
  }
  
  if(!req.query.token) {
    return res.status(500).json({ error: 'Token is required' });
  }

  Reminder.find({ teamName: req.query.name, token: req.query.token }, function (err, reminders) {
    if(err) { return handleError(res, err); }
    return res.json(200, reminders);
  });
};

// Get a single reminder
exports.show = function(req, res) {
  Reminder.findById(req.params.id, function (err, reminder) {
    if(err) { return handleError(res, err); }
    if(!reminder) { return res.send(404); }
    return res.json(reminder);
  });
};

// Creates a new reminder in the DB.
exports.create = function(req, res) {
  Reminder.create(req.body, function(err, reminder) {
    if(err) { return handleError(res, err); }
    return res.json(201, reminder);
  });
};

// Updates an existing reminder in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Reminder.findById(req.params.id, function (err, reminder) {
    if (err) { return handleError(res, err); }
    if(!reminder) { return res.send(404); }
    var updated = _.merge(reminder, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, reminder);
    });
  });
};

// Deletes a reminder from the DB.
exports.destroy = function(req, res) {
  Reminder.findById(req.params.id, function (err, reminder) {
    if(err) { return handleError(res, err); }
    if(!reminder) { return res.send(404); }
    reminder.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}