import React                    from 'react';
import { RouteHandler, State }  from 'react-router'
import { Link }                 from 'react-router'
import FluxComponent            from 'flummox/component';
import BlurbDetail from './BlurbDetail.react';

const BlurbListPage = React.createClass({

  mixins: [ State ],

  statics: {
    async routerWillRun(state, flux) {
      let blurbActions = flux.getActions('blurb');
      return blurbActions.getBlurbs({id: state.params.id});
    }
  },

  render() {
    return (
      <FluxComponent connectToStores={['blurb']}>
        <BlurbDetail />
      </FluxComponent>
    );
  }

});

export default BlurbListPage;