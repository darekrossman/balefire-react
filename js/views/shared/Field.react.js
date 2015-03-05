import React      from 'react/addons';
import { Toggle } from 'material-ui';

const Field = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func,
    label: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['text', 'textarea', 'toggle']),
    rows: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      readOnly: false,
      type: 'text',
      label: 'Field Label',
      onBlur: function(){}
    };
  },

  render() {
    let el;

    let {
      name,
      value,
      readOnly,
      onFocus,
      onBlur,
      onChange,
      className,
      ...other
    } = this.props;

    switch(this.props.type) {
      case 'text':
        el = <input 
              name={this.props.name}
              value={this.props.value}
              onChange={this.inputChange}
              onBlur={this.inputBlur}
              onFocus={this.inputFocus}
              readOnly={this.props.readOnly}/>
        break;

      case 'textarea':
        el = <textarea 
              ref="textarea"
              rows={this.props.rows}
              name={this.props.name}
              value={this.props.value}
              onChange={this.inputChange}
              onBlur={this.inputBlur}
              onFocus={this.inputFocus}
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

    let classes = 'Field ' + this.props.className;

    return (
      <div className={classes} {...other}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        {el}
      </div>
    );
  },

  inputChange(e) {
    // this.calcRows();
    this.props.onChange(e, this.getPayload(e));
  },

  inputBlur(e) {
    this.props.onBlur(e, this.getPayload(e));
  },

  inputFocus(e) {
    // this.calcRows();
    this.props.onFocus(e, this.getPayload(e));
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