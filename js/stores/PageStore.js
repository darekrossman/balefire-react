import { Store } from 'flummox';

class PageStore extends Store {

  constructor(flux) {
    super(); // Don't forget this step

    let pageActionIds = flux.getActionIds('page');
    this.register(pageActionIds.createPage, this.handleNewPage);

    this.state = {
      pages: [],
    };
  }
 
  handleNewPage(payload) {
    console.log('store got payload', payload)
    this.setState({
      pages: this.state.pages.concat([payload]),
    });
  }

}

export default PageStore;