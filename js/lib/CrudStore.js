import { Store } from 'flummox';
import assign from 'object-assign'    

class CrudStore extends Store {
  
  constructor(flux, opts) {
    super(); // Don't forget this step

    if (opts.crudActionListeners && opts.crudActionListeners.forEach) {
      opts.crudActionListeners.forEach(action => {
        let crudActionIds = flux.getActionIds(action);
        this.register(crudActionIds.getAll, this.onGet)
        this.register(crudActionIds.save, this.onSave)
        this.register(crudActionIds.create, this.onCreate)
        this.register(crudActionIds.update, this.onUpdate)
      })
    } else {
      throw new Error('Extending class must provide actionListeners')
    }
  
  }

}

export default CrudStore;