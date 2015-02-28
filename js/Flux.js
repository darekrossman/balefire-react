import { Flux } from 'flummox';

// Actions imports
import AppActions       from './actions/AppActions';
import PageActions      from './actions/PageActions';
import BlurbActions     from './actions/BlurbActions';
import PromotionActions from './actions/PromotionActions';

// Stores imports
import AppStore         from './stores/AppStore';
import PageStore        from './stores/PageStore';
import BlurbStore       from './stores/BlurbStore';
import PromotionStore   from './stores/PromotionStore';

class FluxApp extends Flux {

  constructor() {
    super();

    this.createActions('app', AppActions);
    this.createActions('page', PageActions);
    this.createActions('blurb', BlurbActions);
    this.createActions('promotion', PromotionActions);
    
    this.createStore('app', AppStore, this);
    this.createStore('page', PageStore, this);
    this.createStore('blurb', BlurbStore, this);
    this.createStore('promotion', PromotionStore, this);
  } 

}

export default FluxApp;