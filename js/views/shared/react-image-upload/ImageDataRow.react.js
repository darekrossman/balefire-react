import React from 'react';
import {FontIcon} from 'material-ui';
import Field from '../../shared/Field.react';

const ImageDataRow = React.createClass({

  getInitialState: function() {
    return {
      imageDimensions: ''
    }
  },
    
  componentDidMount: function() {
    this.setState({
      imageDimensions: this._getImageDimensions()
    })
  },

  render: function() {
    
    let image = this.props.image;

    return (
      <div className="ImageDataRow layout horizontal">
        
        <div className="ImageDataRow__thumbnail">
          <img ref="imageInput" src={image.dataURI ? image.dataURI : image.imgPath}/>
          <p>Dimensions: {this.state.imageDimensions}</p>
        </div>

        <div className="ImageDataRow__detail flex">
          
          <Field
            index={this.props.index} 
            name="fileName"
            parent="featuredImages"
            label="Filename"
            value={image.fileName}
            onChange={this.handleInputChange}
            readOnly
          />

          <Field
            index={this.props.index} 
            name="imgPath"
            parent="featuredImages"
            label="Image URL"
            value={image.imgPath}
            onChange={this.handleInputChange}
            readOnly
          />

          <div className="layout-hc">
            <Field
              index={this.props.index} 
              name="startDate"
              parent="featuredImages"
              label="Start Date"
              value={image.startDate}
              onChange={this.handleInputChange}
            />
            <Field
              index={this.props.index} 
              name="endDate"
              parent="featuredImages"
              label="End Date"
              value={image.endDate}
              onChange={this.handleInputChange}
            />
          </div>

          <Field
            index={this.props.index} 
            name="altText"
            parent="featuredImages"
            label="Alt Text"
            value={image.altText}
            onChange={this.handleInputChange}
          />

          <Field
            index={this.props.index} 
            name="linkURL"
            parent="featuredImages"
            label="Link URL"
            value={image.linkURL}
            onChange={this.handleInputChange}
          />

          <Field
            index={this.props.index} 
            name="newWindow"
            parent="featuredImages"
            label="Opens New Window"
            value={image.newWindow}
            onChange={this.handleInputChange}
          />

        </div>

      </div>
    );
  },

  handleInputChange: function(e, parent, index){
    this.props.onChange(e, parent, index)
  },

  _getImageDimensions: function(img){
    var el = this.refs.imageInput.getDOMNode();
    return `${el.naturalWidth} x ${el.naturalHeight}`
  }

});

export default ImageDataRow;