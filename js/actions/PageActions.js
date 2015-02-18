import { Actions } from 'flummox';
import Agent from 'superagent';

class PageActions extends Actions {

  createPage(pageData) {
    console.log('creating page!')
    return {
      page: pageData,
      date: Date.now()
    };
  }

  async getAllPages(opts) {
    try {
      return await this.queryPages();
    } catch (error) {
      // handle error somehow
    }
  }

  async queryPages(pageType) {
    return Promise.resolve(`I got page type '${pageType}'`);
  }

}



export default PageActions;