import React    from 'react';
import FieldSet from '../shared/FieldSet.react';

const AdditionalContentFieldSet = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    let promo = this.props.promo

    // only re-render when one of these values changes
    return (
      promo.get('primaryHeading') !== nextProps.promo.get('primaryHeading') ||
      promo.get('seoContent') !== nextProps.promo.get('seoContent')
    ) 
  },

  render: function() {
    return (
      
      <FieldSet 
        item={this.props.promo.toJS()}
        onChange={this.props.onChange}
        fields={[
          {
            name: 'primaryHeading',
            label: 'Primary Heading'
          },
          {
            name: 'seoContent',
            label: 'SEO Content',
            type: 'textarea',
            rows: 5
          },
        ]}
      />
      
    );
  }

});

export default AdditionalContentFieldSet;