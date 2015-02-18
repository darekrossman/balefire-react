import React        from 'react';
import Router       from 'react-router';
import FluxApp      from './FluxApp';
import BalefireApp  from './BalefireApp.react';
import BlurbListPage from './views/BlurbListPage.react';
import BlurbDetailPage from './views/BlurbDetailPage.react';

import resolve from './utils/resolve';

var Route = Router.Route;
  
var routes = (
  <Route handler={BalefireApp}>
    <Route name="blurbs" path="/blurbs" handler={BlurbListPage}/>
    <Route name="blurbs.detail" path="/blurbs/:id" handler={BlurbDetailPage}/>
  </Route>
);

let flux = new FluxApp(); 

Router.run(routes, function (Handler, state) {
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