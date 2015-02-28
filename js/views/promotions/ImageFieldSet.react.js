import React from 'react/addons';
import Picture from '../common/Picture';

const ImageFieldSet = React.createClass({

  // This element is passed as a property to a FieldSet component
  // to provide a custom wrapper around a set of fields
  // 
  // this.props.item      The image passed from owning FieldSet element
  // this.props.fieldSet  The fields to be inserted into the final output

  render() {
    let {dataURI, imgPath} = this.props.item; 

    let classes = React.addons.classSet({
      'waiting': !this.props.item.isUploaded
    })

    return (
      <div className="ImageFieldSet">
        <Picture url={dataURI || imgPath} href={imgPath} size="thumb" className={classes}/>
        <div className="ImageFieldSet__fields">{this.props.fieldSet}</div>
      </div> 
    );
  }

});

export default ImageFieldSet;