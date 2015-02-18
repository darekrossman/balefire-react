import React from 'react';
import { State } from 'react-router';

const BlurbDetail = React.createClass({

  mixins: [ State ],

  render() {
    let blurb = this.props.blurbs[ this.getParams().id ]
    return (
      <div>
        <div>{blurb.title}</div>
        <div dangerouslySetInnerHTML={{__html:blurb.content}}></div>
      </div>
    );
  }

});

export default BlurbDetail;