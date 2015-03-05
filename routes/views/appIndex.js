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

    var appString, title, router;


    var {Handler,state} = yield new Promise((resolve, reject) => {
      router = Router.create({
        routes: routes,
        location: this.url
      });
      router.run((Handler, state) => resolve({ Handler, state }))
    });

    

    /**
     *  Wait for stores to fetch data before continuing. 
     */
    try {
      yield resolveComponent(state.routes, 'routerWillRun', state, flux);
    } catch(err) {
      Handler = require('../../js/views/shared/NotFound.react')
    }

    /**
     * Add flux instance to context so deeply-nested views can easily access it.
     */
    appString = React.withContext(
      { flux },
      () => React.renderToString(<Handler />)
    );

    /**
     * Extracts a title from the React component tree
     */
    title = DocumentTitle.rewind();

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