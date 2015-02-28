import React from 'react';
import { RouteHandler, Link, State } from 'react-router';
import FluxComponent from 'flummox/component';
import BlurbList from './BlurbList.react';

const BlurbListPage = React.createClass({

  mixins: [ State ],

  statics: {
    async routerWillRun(state, flux) {
      let blurbActions = flux.getActions('blurb');
      return blurbActions.getAll();
    }
  },

  render() {
    return (
      <FluxComponent connectToStores={['blurb']}>
        <BlurbList /> 
      </FluxComponent>
    );
  }

});

export default BlurbListPage;