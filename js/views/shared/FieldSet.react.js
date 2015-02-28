import React from 'react';
import Field from './Field.react';
import { FlatButton, IconButton } from 'material-ui';


var FieldSet = React.createClass({

  propTypes: {
    'fieldsFor': React.PropTypes.string,
    'item': React.PropTypes.object.isRequired,
    'onChange': React.PropTypes.func.isRequired,
    'fields': React.PropTypes.array.isRequired,
    'index': React.PropTypes.number
  },

  renderFields() {
    let fields = this.props.fields;

    return fields.map((field, i) => {
      return (
        <Field 
          key={i}
          type={field.type || 'text'}
          rows={field.rows || 0}
          name={field.name}
          value={this.props.item[field.name]}
          onChange={this.handleInputChange}
          readOnly={field.readOnly}
          label={field.label}
        />
      );
    });
  },

  renderFieldSet(i, item, other) {
    if (!this.props.fieldsContainer) 
      return this.renderFields()

    let wrapper = this.props.fieldsContainer
    wrapper.props.item = this.props.item
    wrapper.props.fieldSet = this.renderFields();
    return wrapper;
  },

  render() {
    return (
      <div className="FieldSet">
        { this.renderFieldSet() }
        {this.props.children}
      </div>
    );
  },

  handleInputChange(e, payload) {
    payload.fieldsFor = this.props.fieldsFor;
    payload.index = this.props.index,

    this.props.onChange(e, payload);
  }

});

module.exports = FieldSet;