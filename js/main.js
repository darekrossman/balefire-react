// App Imports
import React    from 'react';
import Router   from 'react-router';
import Flux     from './Flux'; 
import routes   from './routes' 

// Utilities & Helpers
import tapEventPlugin from 'react-tap-event-plugin';
import resolve        from './utils/resolve';

// Adds onTouchTap
// https://github.com/zilverline/react-tap-event-plugin
tapEventPlugin();


//////////////////


/**
 * Creates a new Flux instance
 * @type {Flux}
 */
let flux = new Flux(); 

/**
 * Runs the router against the current URL or request path
 * and renders the appropriate views (defined in routes.js).
 *
 * Each time the route changes, the target view handler's
 * static `routerWillRun` method will be called. This is
 * an opportunity to load any external data into state
 * before the view is rendered.  
 */
Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  async function run() {
    await resolve(state.routes, 'routerWillRun', state, flux);
    React.withContext(
      { flux },
      () => React.render(<Handler />, document.getElementById('app'))
    );
  }
  run().catch(error => {
    throw error;
  });
}); 