import { Actions } from 'flummox';
import request from '../utils/request';

class BlurbActions extends Actions {

  constructor() {
    super()
    this.blurbAPIRoot = 'http://www.valpak.com/pub/vp/blurbs';
  }

  async getBlurbs(opts = {}) {
    let url = !opts.id ? this.blurbAPIRoot : `${this.blurbAPIRoot}/${opts.id}`;
    let response = await request.get(url).exec();
    return response.body;
  }

}



export default BlurbActions;