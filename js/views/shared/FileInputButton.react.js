import React from 'react';
import { FlatButton, FontIcon } from 'material-ui';

const FileInputButton = React.createClass({

  render() {

    let styles = {
      button: {
        position: 'relative'
      },
      input: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0
      }
    };

    return (
      <FlatButton primary={true} className="FileInputButton" style={styles.button}>
        <FontIcon className="mdfi_file_file_upload"/>
        {this.props.label}
        <input multiple type="file" onChange={this.props.onChange} style={styles.input}></input>
      </FlatButton>
    );
  }

});

export default FileInputButton; 