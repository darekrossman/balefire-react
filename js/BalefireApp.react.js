import React            from 'react';
import { RouteHandler } from 'react-router';
import FluxComponent    from 'flummox/component';
import Page             from './views/Page.react';
import HeaderBar        from './views/HeaderBar.react';

const BalefireApp = React.createClass({

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <FluxComponent flux={this.context.flux}>
        <div>
          <HeaderBar>
            <h1 className="flex">Balefire</h1>
          </HeaderBar>

          <Page>
            <RouteHandler />
          </Page>
        </div>
      </FluxComponent>
    );
  }

})

export default BalefireApp;