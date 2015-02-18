import React from 'react';
import FluxComponent    from 'flummox/component';

const Page = React.createClass({

  render() {
    return (
      <FluxComponent connectToStores={['page']}>
        <div className="Page" {...this.props}>
          {this.props.children}
        </div>
      </FluxComponent>
    );
  }

});

export default Page;

