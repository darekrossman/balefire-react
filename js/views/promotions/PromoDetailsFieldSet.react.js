import React    from 'react';
import FieldSet from '../shared/FieldSet.react';

const PromoDetailsFieldSet = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    let promo = this.props.promo

    // only re-render when one of these values changes
    return (
      promo.get('title') !== nextProps.promo.get('title') ||
      promo.get('description') !== nextProps.promo.get('description') ||
      promo.get('startDate') !== nextProps.promo.get('startDate') ||
      promo.get('endDate') !== nextProps.promo.get('endDate') ||
      promo.get('url') !== nextProps.promo.get('url')
    ) 
  },

  render: function() {
    return (
      
      <FieldSet 
        item={this.props.promo.toJS()}
        onChange={this.props.onChange}
        fields={[
          {
            name: 'title',
            label: 'Title'
          },
          {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            rows: 3,
            autogrow: true
          },
          {
            name: 'startDate',
            label: 'Start Date'
          },
          {
            name: 'endDate',
            label: 'End Date'
          },
          {
            name: 'url',
            label: 'URL Slug'
          }
        ]}
      />
      
    );
  }

});

export default PromoDetailsFieldSet;