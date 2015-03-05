var React      = require('react');
var { Route, NotFoundRoute }  = require('react-router');

// Route Views
var App                  = require('./views/App.react');
var BlurbListPage        = require('./views/blurbs/BlurbListPage.react');
var BlurbDetailPage      = require('./views/blurbs/BlurbDetailPage.react');
var MerchantListPage     = require('./views/merchants/MerchantListPage.react');
var MerchantDetailPage   = require('./views/merchants/MerchantDetailPage.react');
var PromotionListPage    = require('./views/promotions/PromotionListPage.react');
var PromotionDetailPage  = require('./views/promotions/PromotionDetailPage.react');
var NotFound             = require('./views/shared/NotFound.react'); 

var routes = (
  <Route path="/balefire/" handler={App}>
    <Route name="blurbs" path="blurbs" handler={BlurbListPage}/>
    <Route name="blurbs.create" path="blurbs/create" handler={BlurbDetailPage}/>
    <Route name="blurbs.detail" path="blurbs/:id" handler={BlurbDetailPage}/>
    
    <Route name="merchants" path="merchants" handler={MerchantListPage}/>
    <Route name="merchants.create" path="merchants/create" handler={MerchantDetailPage}/>
    <Route name="merchants.detail" path="merchants/:id" handler={MerchantDetailPage}/>
    
    <Route name="promotions" path="promotions" handler={PromotionListPage}/>
    <Route name="promotions.create" path="promotions/create" handler={PromotionDetailPage}/>
    <Route name="promotions.detail" path="promotions/:id" handler={PromotionDetailPage}>
      <NotFoundRoute handler={NotFound} />
    </Route>

    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = routes;