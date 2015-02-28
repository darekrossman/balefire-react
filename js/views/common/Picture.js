import React from 'react';

const Picture = React.createClass({

  propTypes: {
    url: React.PropTypes.string,
    size: React.PropTypes.oneOf(['thumb', 'small', 'medium', 'large', 'full']),
    href: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      size: 'thumb'
    };
  },

  render() {

    let styles = {
      container: {
        overflow: 'hidden'
      },
      img: {
        display: 'block',
        maxWidth: '100%',
        background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAIT+yfWM8L4IE5+YX4jWADGAbEZkTkgAQCqXw41QcsBngAAAABJRU5ErkJggg==) repeat'
      }
    }

    let {
      size,
      url,
      href,
      ...other
    } = this.props;

    switch (size) {
      case 'thumb':
        styles.container.width = '180px';
        styles.container.height = '180px';
      break;
    }

    let img = <img src={url} style={styles.img} />;
    let el = this.props.href ? <a href={href} target="_blank">{img}</a> : img;

    return (
      <div className={'Picture ' + this.props.className} style={styles.container}>
        {el}
      </div>
    );
  }

});

export default Picture;