import React                    from 'react';
import { RouteHandler, State, Link }  from 'react-router';
import FluxComponent            from 'flummox/component';

import Page             from './shared/Page.react';
import AppNav           from './shared/AppNav.react';
import HeaderBar        from './shared/HeaderBar.react';
import { IconButton, Snackbar }   from 'material-ui';

const BalefireApp = React.createClass({

  mixins: [ State ],

  contextTypes: {
    flux: React.PropTypes.object.isRequired,
  },

  getInitialState: function() {
    return {
      currentPath: this.getPath(),
      pageScrolled: false 
    };
  },

  componentDidMount: function() {
    let appStore = this.context.flux.getStore('app');
    
    appStore.on('change', () => {
      let message = appStore.getNotification()
      if (message) {
        this.showNotification(message);
      }
    })
  },

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.currentPath !== this.getPath() ||
      this.state.pageScrolled !== nextState.pageScrolled
    )
  },

  componentDidUpdate() {
    let currentPath = this.getPath();
    if (this.state.currentPath !== currentPath)
      this.setState({currentPath: currentPath});
  },

  render() {
    let routeName = this.getRoutes()
      .filter(route => route.name)
      .map(route => route.name)
      .map(name => name.split('.').map(this.capitalize).join(' > '))

    return (

      <div className="AppLayout">
        <AppNav ref="AppNav">
          <li><Link to="blurbs">Blurbs</Link></li>
          <li><Link to="merchants">Merchants</Link></li>
          <li><Link to="promotions">Promotions</Link></li>
        </AppNav>

        <div className="flex">
          <HeaderBar raised={this.state.pageScrolled}>
            <IconButton iconClassName="mdfi_navigation_menu" onTouchTap={this.toggleAppNav}/>
            <h1 className="header-title">{routeName}</h1>
          </HeaderBar>

          <Page onPageScroll={this.pageScroll}>
            <RouteHandler />
          </Page>

          <Snackbar message={''} ref="Snackbar"/>

        </div>
      </div>

    );
  },

  toggleAppNav() {
    setTimeout(() => {
      this.refs.AppNav.toggle();
    }, 150);
  },

  showNotification(message) {
    let snackbar = this.refs.Snackbar;
    snackbar.props.message = message;
    snackbar.show();
  },

  pageScroll(scrollTop) {
    this.setState({
      pageScrolled: scrollTop > 0
    })
  },

  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
  }

})

export default BalefireApp;