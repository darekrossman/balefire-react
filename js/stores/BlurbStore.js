import { Store } from 'flummox';

class BlurbStore extends Store {

  constructor(flux) {
    super(); // Don't forget this step

    let blurbActionIds = flux.getActionIds('blurb');
    this.register(blurbActionIds.getBlurbs, this.receiveBlurbs)
   
    this.state = {
      blurbs: {}
    };
  }

  receiveBlurbs(blurbs) {
    let _blurbs = {};

    if (!blurbs.forEach) {
      // got back a single blurb as an object
      _blurbs[blurbs.id] = blurbs;
    } else {  
      // got back a collection of blurbs
      blurbs.forEach((blurb, i) => {
        _blurbs[blurb.id] = blurb;
      });
    }

    this.setState({
      blurbs: _blurbs
    })
  }

}

export default BlurbStore;