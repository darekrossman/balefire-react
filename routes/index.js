'use strict';

var middleware = require('./middleware');
var appIndex = require('./views/appIndex');
var upload = require('./views/upload');

module.exports = function(app) {
  middleware(app);
  upload(app);
  appIndex(app);
}