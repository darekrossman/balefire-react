'use strict';

// Create koa app
import koa from 'koa';
let app = koa();

module.exports = app;

// Middleware
var routes = require('./routes');

routes(app);

// Start listening
let port = process.env.PORT || 5000;
app.listen(port);
console.log('App started listening on port ' + port);