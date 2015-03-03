import React from 'react/addons';
import { Link } from 'react-router';

import HeaderBar  from '../shared/HeaderBar.react';
import Overlay    from '../../../node_modules/material-ui/lib/js/overlay.js';

let cx = React.addons.classSet;

const AppNav = React.createClass({

  getInitialState() {
    return {
      active: false
    };
  },

  componentWillUpdate(nextProps, nextState) {
    if (!nextState.active) {
      
    } 
  },

  render() {
    let classes = cx({
      'AppNav': true,
      'active': this.state.active
    })

    let overlay = <Overlay show={this.state.active} onTouchTap={this.toggle} />;

    return (
      <div>
        {overlay}
        <nav className={classes}>
          <HeaderBar>
            <h1 className="header-title">Balefire</h1>
          </HeaderBar>
          <ul onTouchTap={this.toggle}>
            {this.props.children}
          </ul>
        </nav>
      </div>
    );
  },

  toggle() {
    this.setState({
      active: !this.state.active
    })
  }

});

export default AppNav;