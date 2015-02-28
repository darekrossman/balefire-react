import React            from 'react';
import Immutable        from 'immutable';
import ImageDataRow     from './ImageDataRow.react';
import FileInputButton  from '../FileInputButton.react';
 
var ImageUpload = React.createClass({

  render: function() {


    let imageRows = this.props.images.map((image, i) => {
      return (
        <ImageDataRow
          key={i}
          index={i}
          image={image}
          onChange={this.handleImageDataChange}
        />
      );
    })

    return (
      <div className="ImageUpload react-image-upload">       
        <div>{imageRows}</div>
        <FileInputButton label="Upload Image" onChange={this.handleFiles}/>
      </div>
    );
  },

  handleFiles: function(e) {
    this.props.onFiles(e, {
      files: e.target.files
    })
  }

});

export default ImageUpload;