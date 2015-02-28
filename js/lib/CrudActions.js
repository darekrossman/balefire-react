import { Actions }  from 'flummox';
import request      from '../utils/request';
import assign       from 'object-assign';

class CrudActions extends Actions {

  create() { 
    return {};
  }

  async save(entity = {}) {
    let url = this.apiRoot;
    let method = 'post';
    if (entity.id) {
      url += `/${entity.id}`;
      method = 'put';
    }
    return request[method](url).send(entity).exec();
  }

  async getAll(opts = {}) {
    let url = this.apiRoot + (opts.id ? `/${opts.id}`:'');
    let {body} = await request.get(url).exec();
    return body;
  }

}

export default CrudActions;