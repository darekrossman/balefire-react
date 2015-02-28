import React    from 'react';
import FieldSet from '../shared/FieldSet.react';

const SocialMetaFieldSet = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  render: function() {
    
    return (
      <FieldSet 
        fieldsFor="socialMeta"
        item={this.props.item.toJS()}
        onChange={this.props.onChange}
        fields={[
          {
           name: 'ogTitle',
           label: 'OpenGraph Title'
          },
          {
           name: 'ogDescription',
           label: 'OpenGraph Description',
           rows: 2
          },
          {
           name: 'twitterURL',
           label: 'Twitter URL'
          },
          {
           name: 'twitterDescription',
           label: 'Twitter Content',
           rows: 2
          },
          {
           name: 'pinterestURL',
           label: 'Pinterest URL'
          },
          {
           name: 'pinterestDescription',
           label: 'Pinterest Content',
           rows: 2
          },
          {
           name: 'googleURL',
           label: 'Google URL'
          },
          {
           name: 'emailURL',
           label: 'Email URL'
          },
          {
           name: 'emailSubject',
           label: 'Email Subject'
          },
          {
            name: 'emailDescription',
            label: 'Email Body',
            rows: 2
          }
        ]}
      />
    );
  }

});

export default SocialMetaFieldSet;