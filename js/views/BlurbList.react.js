import React from 'react';
import {Link} from 'react-router';

const BlurbList = React.createClass({

  propTypes: {
    blurbs: React.PropTypes.object.isRequired
  },

  render() {
    let blurbs = this.props.blurbs;
    
    let items = Object.keys(blurbs).map(blurbId => {
      let blurb = blurbs[blurbId];
      return (
        <div key={blurb.id}>
          <Link to="blurbs.detail" params={{id: blurb.id}}>{blurb.title}</Link>
        </div>
      );
    });
    
    return (
      <div>{items}</div>
    );
  }

});

export default BlurbList;