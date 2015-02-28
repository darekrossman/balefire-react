import React                    from 'react';
import { RouteHandler, State }  from 'react-router'
import { Link }                 from 'react-router'
import FluxComponent            from 'flummox/component';
import BlurbDetail from './BlurbDetail.react';

const BlurbDetailPage = React.createClass({

  mixins: [ State ],

  statics: {
    async routerWillRun(state, flux) {
      let blurbActions = flux.getActions('blurb');
      if (!state.params.id) 
        return blurbActions.create();
      return blurbActions.getAll({id: state.params.id});
    }
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <FluxComponent connectToStores={['blurb']}>
        <BlurbDetail />
      </FluxComponent>
    );
  }

});

export default BlurbDetailPage;