import React  from 'react';
import List   from '../shared/List.react';

const BlogLinksList = React.createClass({

  render() {

    return (
      <List
        {...this.props}
        className="blogLinks-list"
        fieldsFor="blogLinks"
        placeholder="No blog links!? You should add some."
        fields={[
          {
            name: 'title',
            label: 'Title'
          },
          {
            name: 'excerpt',
            label: 'Excerpt',
            type: 'textarea',
            rows: 5
          },
          {
            name: 'thumbnail',
            label: 'Thumbnail'
          },
          {
            name: 'permaLink',
            label: 'Permalink'
          }
        ]}
      />
    );
  }

});

export default BlogLinksList;