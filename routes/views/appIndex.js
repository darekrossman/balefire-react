'use strict';

var React = require('react');
var Router = require('react-router');
var routes = require('../../js/routes');
var DocumentTitle = require('react-document-title');
var Flux = require('../../js/Flux');
var resolveComponent = require('../../js/utils/resolve');

module.exports = function(app) {
  app.get(/.*/, function *() {

    /**
     * Create a new flux instance on every request
     */
    var flux = new Flux();


    var {Handler,state} = yield new Promise((resolve, reject) => {
      Router.run(routes, this.url, (Handler, state) => resolve({ Handler, state }));
    });

    /**
     *  Wait for stores to fetch data before continuing. 
     */
    yield resolveComponent(state.routes, 'routerWillRun', state, flux);

    /**
     * Add flux instance to context so deeply-nested views can easily access it.
     */
    var appString = React.withContext(
      { flux },
      () => React.renderToString(<Handler />)
    );

    /**
     * Extracts a title from the React component tree
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