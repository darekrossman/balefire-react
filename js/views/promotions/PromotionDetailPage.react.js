import React                    from 'react';
import { RouteHandler, State }  from 'react-router'
import { Link }                 from 'react-router'
import FluxComponent            from 'flummox/component';
import PromotionDetail          from './PromotionDetail.react';

const PromotionDetailPage = React.createClass({

  mixins: [ State ],

  statics: {
    async routerWillRun(state, flux) {
      let promotionActions = flux.getActions('promotion');
      if (!state.params.id) 
        return promotionActions.create();
      return promotionActions.getAll({id: state.params.id});
    }
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <FluxComponent connectToStores={['promotion']}>
        <PromotionDetail />
      </FluxComponent>
    );
  }

});

export default PromotionDetailPage;