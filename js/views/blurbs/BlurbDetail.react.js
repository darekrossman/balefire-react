import React            from 'react';
import { State }        from 'react-router';
import { FlatButton, Snackbar }   from 'material-ui';
import ActionsMixin     from '../mixins/ActionsMixin';

const BlurbDetail = React.createClass({

  mixins: [ State, ActionsMixin ],

  render() {
    let blurb = this.props.blurb;
    
    return (
      <div className="BasicLayout">
        
        <section>
          <div className="Article">
            <header>
              <input name="title" className="input-display invisible" placeholder="Blurb Title" value={blurb.title} onChange={this.inputChange}/>
            </header>
            <article>
              <div name="content" className="invisible" contentEditable dangerouslySetInnerHTML={{__html:blurb.content}} onInput={this.inputChange}></div>
            </article>
          </div>
        </section>

        <aside>
          <div className="paper">
            <div className="box quarter bottom">
              <p className="type--menu">Post Actions</p>
            </div>
            <FlatButton label="Save" primary={true} onTouchTap={this.saveBlurb}/>
          </div>
        </aside>

        <Snackbar message={''} ref="Snackbar"/> 

      </div>
    );
  },

  saveBlurb() {
    let blurb = this.serializeBlurb()

    this.actions('blurb')
      .save(blurb)
      .then(
        res => {
          this.notify(<span><span className="success-text">SUCCESS:</span> Blurb saved!</span>)
        },
        err => {
          this.notify(<span><span className="error-text">ERROR:</span> {err.message}</span>)
        }
      )
  },

  serializeBlurb() {
    return this.props.blurb
  },

  notify(message) {
    let snackbar = this.refs.Snackbar;
    snackbar.props.message = message;
    snackbar.show();
  },

  inputChange(e) {
    let payload = {
      id: this.props.blurb.id
    }
    let value = e.target.value ? e.target.value : e.target.innerHTML;
    payload[e.target.getAttribute('name')] = value;
    this.actions('blurb').update(payload)
  }

});

export default BlurbDetail;