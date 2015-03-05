import React                    from 'react';
import { RouteHandler, State, Navigation }  from 'react-router'
import { Link }                 from 'react-router'
import FluxComponent            from 'flummox/component';
import PromotionDetail          from './PromotionDetail.react';

const PromotionDetailPage = React.createClass({

  mixins: [ State, Navigation ],

  statics: {
    async routerWillRun(state, flux) {
      let promotionActions = flux.getActions('promotion');  
      if (!state.params.id) {
        if (state.query.copy)
          return promotionActions.copyPromo();
        return promotionActions.create();
      }
      try {
        await promotionActions.getAll({id: state.params.id});
      } catch(err) {
        return false;
      }
    },
    willTransitionFrom(transition, component) {
      let changed = component.hasUnsavedChanges();
      if (changed) {
        let answer = confirm('Are you sure you want to leave? You still have unsaved changes...')
        if (!answer) transition.abort()
      }
    }
  },

  contextTypes: {
    flux: React.PropTypes.object.isRequired
  },

  hasUnsavedChanges() {
    return this.context.flux._stores.promotion.hasUnsavedChanges();
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