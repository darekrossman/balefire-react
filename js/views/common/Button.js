import React from 'react';

const Button = React.createClass({

  render() {
    
    let { 
      kind,
      label,
      ...other
    } = this.props;

    return (
      <button className="Button" {...other}>
        {label}
        {this.props.children}
      </button>
    );

  }

});

export default Button;