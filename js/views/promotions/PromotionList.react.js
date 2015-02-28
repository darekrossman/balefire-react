import React from 'react';
import { Link, Navigation } from 'react-router';
import { FloatingActionButton } from 'material-ui';

const PromotionList = React.createClass({

  mixins: [ Navigation ],

  propTypes: {
    promotions: React.PropTypes.object.isRequired
  },

  render() {
    let items = this.props.promotions;

    let rows = items.reverse().map((item, i) => {
      return (
        <div key={i} className="DataTable__row">
          <div className="DataTable__cell">
            <Link to="promotions.detail" className="black" params={{id: item.get('id')}}>{item.get('title')}</Link>
          </div>
        </div>
      );
    });
    
    return (
      <div className="box">
        <div className="DataTable">{rows.toJS()}</div>
        <FloatingActionButton 
          primary={true}
          className="sticky-bottom"
          iconClassName="mdfi_content_add" 
          onTouchTap={this.handlePrimaryAction}/>
      </div>
    );
  },

  handlePrimaryAction() {
    this.transitionTo('promotions.create');
  }

});

export default PromotionList;