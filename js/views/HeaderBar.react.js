import React from 'react';

const HeaderBar = React.createClass({

  render() {
    return (
      <div className="HeaderBar" {...this.props}>
        {this.props.children}
      </div>
    );
  }

});

export default HeaderBar;