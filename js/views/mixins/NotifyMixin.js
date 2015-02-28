import React from 'react';
import { Snackbar } from 'material-ui';
 
export default {

  notify(msg) {
    this.props.flux.getActions('app').notify(msg)
  }

}