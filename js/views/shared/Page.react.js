import React from 'react';
import FluxComponent    from 'flummox/component';

const Page = React.createClass({

  componentDidMount: function() {
    this.timer;
    this.target = document.querySelector('.BasicLayout')
  },

  render() {
    return (
      <FluxComponent connectToStores={['page']}>
        <div className="Page" {...this.props} onScroll={this.onScroll}>
          {this.props.children}
        </div>
      </FluxComponent>
    );
  },

  onScroll(e) {

    // clearTimeout(this.timer);

    // if(!this.target.classList.contains('disable-hover')) {
    //   this.target.classList.add('disable-hover')
    // }
    
    // this.timer = setTimeout(() => {
    //   this.target.classList.remove('disable-hover')
    // }, 500);

    requestAnimationFrame( ((s) => {
      return () => {
        this.props.onPageScroll(s)
      }
    })(e.target.scrollTop) )
  }

});

export default Page;

