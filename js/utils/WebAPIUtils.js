import request from './request';

let apiRoot = 'http://vpdev.valpak.com/pub/vp';

let WebAPIUtils = {

  async send(path, entity) { 
    entity = entity.toJS();
    let url = apiRoot + path;
    let method = 'post';
    if (entity.id) {
      url += `/${entity.id}`;
      method = 'put';
    }
    return request[method](url).send(entity).exec(); 
  },

  async get(path, params = {}) {
    let url = apiRoot + path + (params.id ? `/${params.id}`:'');
    return request.get(url).exec();
  }

};

export default WebAPIUtils;