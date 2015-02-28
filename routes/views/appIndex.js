'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('../../js/routes');

var DocumentTitle = require('react-document-title');

/**
 * Import the app's Flux class. Note that this returns a class, NOT a singleton
 * like in most Flux libraries.
 */
var Flux = require('../../js/Flux');

var performRouteHandlerStaticMethod = require('../../js/utils/resolve');

module.exports = function(app) {
  app.get(/.*/, function *() {

    var {Handler,state} = yield new Promise((resolve, reject) => {
      Router.run(routes, this.url, (Handler, state) => resolve({ Handler, state }));
    });

    /**
     * Create a new flux instance on every request
     */
    var flux = new Flux();

    /**
     *  Wait for stores to fetch data before continuing.
     */
    yield performRouteHandlerStaticMethod(state.routes, 'routerWillRun', state, flux);

    /**
     * Add flux instance to context so deeply-nested views can easily access it.
     * Note that "context" here refers to React contexts, not Fluxible contexts.
     * Just want to be super clear in case you're coming from that library :)
     * For more info on contexts, see:
     * https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html
     */
    var appString = React.withContext(
      { flux },
      () => React.renderToString(<Handler />)
    );

    /**
     * Cool library that lets us extract a title from the React component tree
     * so we can render it on the server, which is very important for SEO
     */
    var title = DocumentTitle.rewind();

    /**
     * Pass the initial render of the app to a Jade template
     */
    yield this.render('app', {
      title,
      appString,
      env: process.env,
    });
  });
}