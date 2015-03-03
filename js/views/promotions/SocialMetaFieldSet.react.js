import React    from 'react';
import FieldSet from '../shared/FieldSet.react';
import VPRefHelper from '../../utils/VPRefHelper';

const SocialMetaFieldSet = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  render: function() {

    return (
      <FieldSet 
        fieldsFor="socialMeta"
        item={this.props.item.toJS()}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        fields={[
          {
            name: 'ogTitle',
            label: 'OpenGraph Title'
          },
          {
            name: 'ogDescription',
            label: 'OpenGraph Description',
            type: 'textarea',
            rows: 2
          },

          { 
            name: 'twitterDescription',
            label: 'Twitter Description',
            type: 'textarea',
            rows: 2
          },
          {
            name: 'twitterURL',
            label: 'Twitter URL',
            onFocus: this.autoPopulateShareUrl('twitter')
          },

          {
            name: 'pinterestDescription',
            label: 'Pinterest Description',
            type: 'textarea',
            rows: 2
          },
          {
            name: 'pinterestURL',
            label: 'Pinterest URL',
            onFocus: this.autoPopulateShareUrl('pinterest')
          },

          {
            name: 'googleDescription',
            label: 'Google Description',
            type: 'textarea',
            rows: 2
          },
          {
            name: 'googleURL',
            label: 'Google URL',
            onFocus: this.autoPopulateShareUrl('google')
          },

          {
            name: 'emailSubject',
            label: 'Email Subject'
          },
          {
            name: 'emailDescription',
            label: 'Email Body',
            type: 'textarea',
            rows: 2
          },
          {
            name: 'emailURL',
            label: 'Email URL',
            onFocus: this.autoPopulateShareUrl('email')
          }
       ]}
     />
    );
  },

  // Return a listener that auto-populates the field
  // with the share URL and VPREF for a given network
  autoPopulateShareUrl(site) {
    return (e, payload) => {
      payload.value = `http://www.valpak.com/promotions/{URL_SLUG}?vpref=${VPRefHelper.ref(site, this.props.omniPageName)}`;
      payload.item[payload.name] = payload.value;
      this.props.onChange(e, payload);
    }
  }

});

export default SocialMetaFieldSet;