import React from 'react/addons'
import List from '../shared/List.react';

const PrimaryListingsFieldSet = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  render: function() {
    return (
      <List
        className="primaryMerchantListings-list"
        fieldsFor="primaryMerchantListings"
        items={this.props.items.toJS()}
        onChange={this.props.onChange}
        onAdd={this.props.onAdd}
        onRemove={this.props.onRemove}
        placeholder="No primary listings!? You should add some."
        fields={[
          {
            name: 'merchantId',
            label: 'Mer ID'
          },
          {
            name: 'offerId',
            label: 'Offer ID'
          }
        ]}
      />
    );
  }

});

export default PrimaryListingsFieldSet;