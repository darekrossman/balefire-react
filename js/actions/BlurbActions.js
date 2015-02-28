import { Actions }  from 'flummox';
import CrudActions  from '../lib/CrudActions';
import request      from '../utils/request';
import assign       from 'object-assign';
import APIUtils     from '../utils/WebAPIUtils';

class BlurbActions extends Actions {
 
  constructor() { 
    super();
  }

  create() { 
    return {};
  } 

  async save(entity) {
    return APIUtils.send('/blurbs', entity);
  }

  async getAll(params) {
    let {body} = await APIUtils.get('/blurbs', params);
    return body;
  }

  update(entity = {}) {
    return entity;
  }

}

export default BlurbActions;