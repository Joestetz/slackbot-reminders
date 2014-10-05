/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var Reminder = require('../api/reminder/reminder.model');


Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

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