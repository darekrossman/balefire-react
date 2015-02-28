import { Actions } from 'flummox';
import Agent from 'superagent';

class AppActions extends Actions {

  constructor() { 
    super();
  } 

  notify(msg) {
    return {
      msg: msg
    }
  } 

}

export default AppActions;