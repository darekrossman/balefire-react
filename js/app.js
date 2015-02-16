var React     = window.React = require('react');
var Router    = require('react-router');
var App       = require('./App.react');
var Route     = Router.Route;
 
// Bring in your component as the default
// var DefaultComponent = require('./[YOUR COMPONENT]'); 
 
var routes = (
  <Route name="app" path="/" handler={App}>
    // Uncomment to add your component as the default handler
    // <Router.DefaultRoute handler={DefaultComponent}/>    
  </Route>
); 

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
}); 


 

