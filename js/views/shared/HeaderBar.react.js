import React from 'react/addons';

const HeaderBar = React.createClass({

  getDefaultProps: function() {
    return {
      raised: false
    };
  },

  render() {
    let classes = React.addons.classSet({
      'HeaderBar': true,
      'raised': this.props.raised
    })
    return (
      <div className={classes} {...this.props}>
        {this.props.children}
      </div>
    );
  }

});

export default HeaderBar;