'use strict';

var middleware = require('./middleware');
var appIndex = require('./views/appIndex');

module.exports = function(app) {
  middleware(app);
  appIndex(app);
}