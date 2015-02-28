import React from 'react';
import { Link, Navigation } from 'react-router';
import { FloatingActionButton } from 'material-ui';

const BlurbList = React.createClass({

  mixins: [ Navigation ],

  propTypes: {
    blurbs: React.PropTypes.object.isRequired
  },

  render() {
    let blurbs = this.props.blurbs;
    
    let items = Object.keys(blurbs).map(blurbId => {
      let blurb = blurbs[blurbId];
      return (
        <div key={blurb.id} className="DataTable__row">
          <div className="DataTable__cell">
            <Link to="blurbs.detail" params={{id: blurb.id}}>{blurb.title}</Link>
          </div>
        </div>
      );
    });
    
    return (
      <div className="box">
        <div className="DataTable">{items}</div>
      </div>
    );
  },

  handlePrimaryAction() {
    this.transitionTo('blurbs.create');
  }

});

export default BlurbList;