import React      from 'react';
import { Toggle } from 'material-ui';

const Field = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    rows: React.PropTypes.number,
    type: React.PropTypes.oneOf(['text', 'textarea', 'toggle'])
  },

  getDefaultProps: function() {
    return {
      rows: 3,
      readOnly: false,
      type: 'text',
      label: 'Field Label'
    };
  },

  render() {
    let el;

    switch(this.props.type) {
      case 'text':
        el = <input 
              name={this.props.name}
              value={this.props.value}
              onChange={this.inputChange}
              readOnly={this.props.readOnly}/>
        break;

      case 'textarea':
        el = <textarea 
              rows={this.props.rows}
              name={this.props.name}
              value={this.props.value}
              onChange={this.inputChange}
              readOnly={this.props.readOnly}></textarea>
        break;

      case 'toggle':
        el = (
          <div className="fieldtoggle">
            <Toggle
              name={this.props.name}
              defaultToggled={this.props.value}
              onToggle={this.inputChange}
            />
          </div>
        )
    }

    return (
      <div className="Field">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        {el}
      </div>
    );
  },

  inputChange(e) {
    this.props.onChange(e, this.getPayload(e));
  },

  getPayload(e) {
    let value;
    let name = e.target.getAttribute('name');
    let detail = {};

    if (e.target.type === 'checkbox')
      value = e.target.checked;
    else
      value = e.target.value;

    detail[name] = value;

    return {
      'name': name,
      'value': value, 
      'item': detail
    }
  }

});

export default Field;