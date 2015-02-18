import { Flux } from 'flummox';
import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';
import PageActions from './actions/PageActions';
import PageStore from './stores/PageStore';
import BlurbActions from './actions/BlurbActions';
import BlurbStore from './stores/BlurbStore';

class FluxApp extends Flux {

  constructor() {
    super();

    this.createActions('app', AppActions);
    this.createStore('app', AppStore, this);

    this.createActions('page', PageActions);
    this.createStore('page', PageStore, this);

    this.createActions('blurb', BlurbActions);
    this.createStore('blurb', BlurbStore, this);
  } 

}

export default FluxApp;