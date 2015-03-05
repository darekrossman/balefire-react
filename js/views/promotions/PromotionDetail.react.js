import React                    from 'react';
import { State, Navigation }    from 'react-router';
import moment                   from 'moment';
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
import AdditionalContentFieldSet from './AdditionalContentFieldSet.react';
import ImageFieldSet            from './ImageFieldSet.react';
import FileInputButton  from '../shared/FileInputButton.react';
import {
  FlatButton, 
  FloatingActionButton,
  Tabs,
  Tab,
  DropDownMenu
} from 'material-ui';

const PromotionDetail = React.createClass({

  mixins: [ State, Navigation, ActionsMixin, NotifyMixin ],

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props.promotion !== nextProps.promotion
  },

  render() {
    let promo = this.props.promotion;

    let menuItems = [
     { payload: 'US_ONLY', text: 'US' },
     { payload: 'CA_ONLY', text: 'CAN' },
     { payload: 'US_CA', text: 'US & CAN' }
    ];

    menuItems.forEach((item, i) => {
      if (item.payload === promo.promoCountryEnum) {
        menuItems.unshift(item);
        menuItems.splice(i+1, 1);
      }
    })

    console.log('rendering with unsaved changes', this.props.flux._stores.promotion.hasUnsavedChanges())

    return (
      
      <div className="BasicLayout">
        
        <section> 

          <Tabs>
            <Tab label="Details">
              {/* Promo Details */}
              <div className="paper-box">
                <h5 className="paper-box__heading">Promo Details</h5>
                <PromoDetailsFieldSet
                  promo={promo}
                  onChange={this.updateFieldValues}
                />
              </div>  
            </Tab>
            
            <Tab label="Meta Info">

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
                  onBlur={this.autofillSocialURLField}
                  omniPageName={promo.getIn(['pageMeta', 'omniPageName'])}
                />
              </div>

            </Tab>

            <Tab label="Listings">
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
            </Tab>

            <Tab label="Features">
              
              <div className="paper-box">
                <h5 className="paper-box__heading">Theme Colors</h5>
                <div className="layout-hc">
                  <Field
                    className="flex" 
                    name="primaryThemeColor"
                    label="Primary"
                    value={promo.get('primaryThemeColor')}
                    onChange={this.updateFieldValues}
                  />
                  <Field
                    className="flex" 
                    name="secondaryThemeColor"
                    label="Secondary"
                    value={promo.get('secondaryThemeColor')}
                    onChange={this.updateFieldValues}
                  />
                </div>
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

              {/* Custom Widget 1 */}  
              <div className="paper-box">
                <h5 className="paper-box__heading">Custom Widget One</h5>
                <div className="FieldSet">
                  <Field 
                    name="customWidget1Header"
                    label="Widget Header"
                    value={promo.get('customWidget1Header')}
                    onChange={this.updateFieldValues}
                  />
                  <Field 
                    rows={8}
                    type="textarea"
                    name="customWidget1"
                    label="Widget Code"
                    value={promo.get('customWidget1')}
                    onChange={this.updateFieldValues}
                  />
                </div>
              </div>

              {/* Custom Widget 2 */}  
              <div className="paper-box">
                <h5 className="paper-box__heading">Custom Widget Two</h5>
                <div className="FieldSet">
                  <Field 
                    name="customWidget2Header"
                    label="Widget Header"
                    value={promo.get('customWidget2Header')}
                    onChange={this.updateFieldValues}
                  />
                  <Field 
                    rows={8}
                    type="textarea"
                    name="customWidget2"
                    label="Widget Code"
                    value={promo.get('customWidget2')}
                    onChange={this.updateFieldValues}
                  />
                </div>
              </div>

            </Tab>

            <Tab label="Misc">
              {/* Additional Content */}
              <div className="paper-box">
                <h5 className="paper-box__heading">Additional Content</h5>
                <AdditionalContentFieldSet
                  promo={promo}
                  onChange={this.updateFieldValues}
                />
              </div> 
            </Tab>
          </Tabs>


        </section>

        <aside>
          <div className="paper">
            <div className="box quarter bottom" style={{paddingBottom:'2em'}}>
              <p>
                <span style={{width:50, display:'inline-block'}} className="type--caption">Created:</span>&nbsp;
                <span className="type--menu">{moment(promo.dataCreated).format("MM/DD/YY h:mm a")}</span>
              </p>
              <p>
                <span style={{width:50, display:'inline-block'}} className="type--caption">Modified:</span>&nbsp;
                <span className="type--menu">{moment(promo.dataLastModified).format("MM/DD/YY h:mm a")}</span>
              </p>
              <p>
                <span style={{width:50, display:'inline-block'}} className="type--caption">Status:</span>&nbsp;
                <span className="type--menu">Inactive</span>
              </p>

              
              <div className="layout-hc">
                <p style={{width:50}} className="type--caption">Region:</p>
                <DropDownMenu menuItems={menuItems} onChange={this.setRegion}/>
              </div>

            </div>

            <div className="layout-hc">
              <FlatButton className="block flex" label="Save" disabled={!this.props.flux._stores.promotion.hasUnsavedChanges()} primary={true} onTouchTap={this.savePromotion}/>
              <FlatButton className="block flex" label="Copy" secondary={true} onTouchTap={this.copyPromotion}/>
              <FlatButton className="block flex" label="Delete" secondary={true} onTouchTap={this.deletePromotion}/>
            </div>

          </div>
        </aside>

      </div>
    );
  }, 

  setRegion(e, selectedIndex, menuItem) {
    let item = {
      promoCountryEnum: menuItem.payload
    }
    this.actions('promotion').updatePromo({
      name: 'promoCountryEnum',
      value: menuItem.payload,
      item: item
    });
  },

  savePromotion() {
    this.actions('promotion').save(this.props.promotion)
  },

  copyPromotion() {
    this.transitionTo('promotions.create', {}, {copy: true})
  },

  deletePromotion() {
    this.actions('promotion').deletePromo({id: this.props.promotion.id});
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

  // when leaving certain social fields, we might want
  // to auto populate associated inputs, like share URLs w/ VPREFs
  autofillSocialURLField(e, payload) {
    switch(payload.name) {
      case 'twitterDescription':
        // check autopopulation
        break;
      case 'pinterestDescription':
        // check autopopulation
        break;
      case 'googleDescription':
        // check autopopulation
        break;
      case 'emailDescription':
        // check autopopulation
        break;
    }
  }

});

export default PromotionDetail;