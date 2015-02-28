import React                    from 'react';
import { State, Navigation }    from 'react-router';
import { FlatButton, FloatingActionButton }           from 'material-ui';
import ActionsMixin             from '../mixins/ActionsMixin';
import NotifyMixin              from '../mixins/NotifyMixin';
import List                     from '../shared/List.react';
import FieldSet                 from '../shared/FieldSet.react';
import Field                    from '../shared/Field.react';
import ImageUpload              from '../shared/react-image-upload/ImageUpload.react';
import PrimaryListingsList      from './PrimaryListingsList.react';
import BlogLinksList            from './BlogLinksList.react';
import SocialMetaFieldSet       from './SocialMetaFieldSet.react';
import PageMetaFieldSet         from './PageMetaFieldSet.react';
import PromoDetailsFieldSet     from './PromoDetailsFieldSet.react';
import ImageFieldSet            from './ImageFieldSet.react';

import FileInputButton  from '../shared/FileInputButton.react';

const PromotionDetail = React.createClass({

  mixins: [ State, ActionsMixin, NotifyMixin ],

  render() {
    let promo = this.props.promotion;

    return (
      
      <div className="BasicLayout">
        
        <section> 

          {/* Promo Details */}
          <div className="paper-box">
            <h5 className="paper-box__heading">Promo Details</h5>
            <PromoDetailsFieldSet
              promo={promo}
              onChange={this.updateFieldValues}
            />
          </div>  
 

          {/* Page Meta Info */}  
          <div className="paper-box">
            <h5 className="paper-box__heading">Page Meta Info</h5>
            <PageMetaFieldSet 
              item={promo.get('pageMeta')}
              onChange={this.updateFieldValues}
            />
          </div>

          {/* Social Meta Info */}  
          <div className="paper-box">
            <h5 className="paper-box__heading">Social Meta Info</h5>
            <SocialMetaFieldSet 
              item={promo.get('socialMeta')}
              onChange={this.updateFieldValues}
            />
          </div>

          {/* Primary Listings*/}  
          <div className="paper-box">
            <h5 className="paper-box__heading">Primary Listings</h5>
            <PrimaryListingsList 
              items={promo.get('primaryMerchantListings')}
              onChange={this.updateFieldValues}
              onAdd={this.addPrimaryListing}
              onRemove={this.removePrimaryListing}
            />
          </div>

          {/* Category Listings */}   
          <div className="paper-box">
            <h5 className="paper-box__heading">Category Listings</h5>
            <div className="FieldSet">
              <Field 
                rows={2}
                type="textarea"
                name="affiliateCategories"
                label="Affiliate Category IDs"
                value={promo.get('affiliateCategories')}
                onChange={this.updateFieldValues}
              />
            </div>
          </div>

          {/* Blog Links */}  
          <div className="paper-box">
            <h5 className="paper-box__heading">Blog Links</h5>
            <BlogLinksList
              items={promo.get('blogLinks').toJS()}
              onChange={this.updateFieldValues}
              onAdd={this.addBlogPost}
              onRemove={this.removeBlogPost}
            />
          </div>

          {/* Featured Images */}  
          <div className="paper-box">
            <h5 className="paper-box__heading">Featured Images</h5>
            <List
              className="featuredImages-list"
              fieldsFor="featuredImages"
              items={promo.get('featuredImages').toJS()}
              onChange={this.updateFieldValues}
              onRemove={this.removeFeaturedImage}
              placeholder="No Images!? You should add some."
              addButton={<FileInputButton label="Upload Image" onChange={this.handleFilesSelected}/>}
              fieldsContainer={<ImageFieldSet />}
              fields={[
                {
                  name: 'fileName',
                  label: 'Filename',
                  readOnly: true
                },
                {
                  name: 'imgPath',
                  label: 'ImageURL',
                  readOnly: true
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
                  name: 'altText',
                  label: 'Alt Text'
                },
                {
                  name: 'linkURL',
                  label: 'Link URL'
                },
                {
                  name: 'newWindow',
                  label: 'Open link in new window',
                  type: 'toggle'
                }
              ]}
            />
          </div>


        </section>

        <aside>
          <div className="paper">
            <div className="box quarter bottom">
              <p>
                <span style={{width:50, display:'inline-block'}} className="type--caption">Created:</span>&nbsp;
                <span className="type--menu">01-01-15</span>
              </p>
              <p>
                <span style={{width:50, display:'inline-block'}} className="type--caption">Region:</span>&nbsp;
                <span className="type--menu">US Only</span>
              </p>
              <p>
                <span style={{width:50, display:'inline-block'}} className="type--caption">Status:</span>&nbsp;
                <span className="type--menu">Live</span>
              </p>
            </div>
            <FlatButton className="block" label="Save" primary={true} onTouchTap={this.savePromotion}/>
          </div>
        </aside>

      </div>
    );
  }, 

  savePromotion() {
    this.actions('promotion').save(this.props.promotion)
  },

  addBlogPost() {
    this.actions('promotion').addBlogPost()
  },

  removeBlogPost(e, payload) {
    this.actions('promotion').removeBlogPost(payload.index)
  },

  addPrimaryListing() {
    this.actions('promotion').addPrimaryListing()
  },

  removePrimaryListing(e, payload) {
    this.actions('promotion').removePrimaryListing(payload.index)
  },



  inputChange(e, parent, index) {
    let obj = {}
    let value = e.target.value ? e.target.value : e.target.innerHTML;
    obj[e.target.getAttribute('name')] = value;
    this.actions('promotion').update(obj, parent, index);
  },


  updateFieldValues(e, payload) {
    this.actions('promotion').updatePromo(payload);
  },

  handleFilesSelected(e) {
    this.actions('promotion').receiveLocalImages(e.target.files)
  },

  removeFeaturedImage(e, payload) {
    this.actions('promotion').removeFeaturedImage(payload.index)
  },

});

export default PromotionDetail;