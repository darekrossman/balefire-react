import React from 'react/addons';
import FieldSet from './FieldSet.react';
import { 
  FlatButton, 
  IconButton,
  FontIcon
} from 'material-ui';

let cx = React.addons.classSet;

const List = React.createClass({

  propTypes: {
    'fieldsFor': React.PropTypes.string.isRequired,
    'items': React.PropTypes.array.isRequired,
    'onAdd': React.PropTypes.func,
    'onRemove': React.PropTypes.func,
    'onChange': React.PropTypes.func.isRequired,
    'fields': React.PropTypes.array.isRequired,
    'placeholder': React.PropTypes.string,
    'addButton': React.PropTypes.element
  },

  render() {

    let {
      className, 
      items,
      onAdd,
      onRemove,
      addButton,
      placeholder,
      ...other
    } = this.props;
    
    let classes = cx({
      'List': true
    })


    
    return (
      <div className={classes}>

        <div className="List__item-fields">
          {items.length ? 
            items.map((item, i) => {
              return (
                <FieldSet 
                  className="List__FieldSet"
                  key={i}
                  index={i}
                  item={item}
                  {...other}>
                  
                  <IconButton 
                    className="List__FieldSet__remove-button"
                    iconClassName="mdfi_content_clear" 
                    data-index={i} 
                    onTouchTap={this.onRemoveFieldSet}/>

                </FieldSet>)
            }) : 
            <p className="List__placeholder">{this.props.placeholder}</p>
          }
        </div>
        

        {this.props.addButton ? this.props.addButton :
          <FlatButton className="List__FieldSet__add-button" onTouchTap={this.onAddFieldSet} primary={true}>
            <FontIcon className="mdfi_content_add"/>
            Add
          </FlatButton>  
        }        
      </div>
    );
  },

  onAddFieldSet(e) {
    this.props.onAdd(e, {
      fieldsFor: this.props.fieldsFor
    })
  },

  onRemoveFieldSet(e) {
    this.props.onRemove(e, {
      index: e.currentTarget.dataset.index 
    })
  },

  onFieldSetChange(e, payload) {
    this.props.onChange(e, payload)
  }

});

export default List;