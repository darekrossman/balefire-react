import { Store } from 'flummox';
import CrudStore from '../lib/CrudStore';
import assign from 'object-assign'    

class BlurbStore extends CrudStore {
  
  constructor(flux) {
    super(flux, {
      crudActionListeners: ['blurb']
    }); 

    this.state = {
      blurbs: {},
      blurb: {}
    };
  }
  
  onGet(response) {
    let _state = {};

    if (!response.forEach) {
      // got back a single blurb as an object
      _state.blurb = response;
    } else {  
      // got back a collection of blurbs
      _state.blurbs = {};
      response.forEach((blurb, i) => {  
        _state.blurbs[blurb.id] = blurb;
      });
    }

    this.setState(_state);
  }

  onCreate() {
    this.setState({
      blurb: {}
    })
  }

  onUpdate(entity) {
    delete entity.id;
    this.setState({
      blurb: assign({}, this.state.blurb, entity)
    })
  }

  onSave(res) {
    console.log('Store was notified that a blurb was saved', res)
  }

}

export default BlurbStore;