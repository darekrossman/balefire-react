import React          from 'react';
import { RouteHandler, Link, State } from 'react-router';
import FluxComponent  from 'flummox/component';
import PromotionList  from './PromotionList.react';

const BlurbListPage = React.createClass({

  mixins: [ State ],

  statics: {
    async routerWillRun(state, flux) {
      let promotionActionIds = flux.getActions('promotion');
      return promotionActionIds.getAll();
    }
  },

  render() {
    return (
      <FluxComponent connectToStores={['promotion']}>
        <PromotionList /> 
      </FluxComponent>
    );
  }

});

export default BlurbListPage;