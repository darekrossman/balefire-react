import React    from 'react';
import FieldSet from '../shared/FieldSet.react';

const PageMetaFieldSet = React.createClass({

  mixins: [ React.addons.PureRenderMixin ],

  render: function() {
    return (
      <FieldSet 
        fieldsFor="pageMeta"
        item={this.props.item.toJS()}
        onChange={this.props.onChange}
        fields={[
          {
            name: 'title',
            label: 'Meta Title'
          },
          {
            name: 'description',
            label: 'Meta Description',
            type: 'textarea',
            rows: 2
          },
          {
            name: 'omniPageName',
            label: 'Omniture Name'
          }
        ]}
      />      
    );
  }

});

export default PageMetaFieldSet;