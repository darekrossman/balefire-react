'use strict';

var path = require('path');

// var gzip = require('koa-gzip');
// var fresh = require('koa-fresh');
// var conditional = require('koa-conditional-get');
// var etag = require('koa-etag');
// var serve = require('koa-static');
var views = require('koa-views');
var router = require('koa-router');

module.exports = function(app) {
  // Error handling
  app.use(function *(next) {
    try {
      yield next;
    } catch (error) {
      this.status = error.status || 500;
      this.body = error.message;
      this.app.emit('error', error, this);
    }
  });

  // gzip compression
  // app.use(gzip());

  // Conditional GET
  // app.use(conditional());

  // Freshness testing
  // app.use(fresh());

  // etags
  // app.use(etag());

  // Serve static assets from `public` directory
  // app.use(serve('public'));

  // Add jade rendering
  app.use(views(path.join(process.cwd(), 'views'), {
    cache: true,
    default: 'jade',
  }));

  app.use(router(app));
}