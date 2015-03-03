import { Store } from 'flummox';
import CrudStore from '../lib/CrudStore';
import Immutable from 'immutable';
import assign from 'object-assign' 

const PromotionRecord = Immutable.Record({
  "id":"",
  "title" : "",
  "description" : "",
  "url" : "",
  "startDate" : "",
  "endDate" : "",
  "primaryHeading" : "",
  "seoContent" : "",
  "pageMeta" : Immutable.Map({
    "title" : "",
    "description" : "",
    "omniPageName" : ""
  }),
  "socialMeta" : Immutable.Map({
    "pinterestURL" : "",
    "pinterestDescription" : "",
    "googleURL" : "",
    "ogTitle" : "",
    "ogDescription" : "",
    "twitterURL" : "",
    "twitterDescription" : "",
    "emailSubject" : "",
    "emailDescription" : "",
    "emailURL" : ""
  }),
  "affiliateCategories" : "",
  "featuredImages": Immutable.List(),
  "primaryMerchantListings" : Immutable.List(),
  "blogLinks" : Immutable.List(),
});

class PromotionStore extends CrudStore {
  
  constructor(flux) {
    super(flux, { crudActionListeners: ['promotion'] }); 
    let promotionActionIds = flux.getActionIds('promotion');
    this.register(promotionActionIds.addBlogPost, this.onAddBlogPost)
    this.register(promotionActionIds.removeBlogPost, this.onRemoveBlogPost)
    this.register(promotionActionIds.addPrimaryListing, this.onAddPrimaryListing)
    this.register(promotionActionIds.removePrimaryListing, this.onRemovePrimaryListing)
    this.register(promotionActionIds.updatePromo, this.onUpdatePromo)
    this.register(promotionActionIds.readLocalImage, this.onAddFeaturedImage)
    this.register(promotionActionIds.uploadImage, this.onUploadImage)
    this.register(promotionActionIds.removeFeaturedImage, this.onRemoveFeaturedImage)

    this.state = {
      promotions: Immutable.List(),
      promotion: new PromotionRecord()
    };    
  } 

  transformPromotion(data) {
    return new PromotionRecord(
      data.merge({
        affiliateCategories: data.get('affiliateCategories').join(', '),
      })
    )
  }
  
  onGet(response) {
    let data = Immutable.fromJS(response)
    
    if (Immutable.List.isList(data))
      this.setState({ promotions: data.map(this.transformPromotion) });
    else
      this.setState({ promotion: this.transformPromotion(data) });
  }

  onCreate() {
    this.setState({ promotion: new PromotionRecord() })
  }

  onUpdatePromo(payload) {
    let updatePath = [
      payload.fieldsFor, 
      payload.index,
      payload.name
    ].filter(x => typeof x !== 'undefined')

    this.setState({
      promotion: this.state.promotion.setIn(updatePath, payload.value)
    })
  }
   
  onUpdate(payload) {
    let index = payload.entity['__index__'];
    let entity = Immutable.fromJS(payload.entity);
    let objPath = payload.objPath;
    let obj = Immutable.Map();

    if (typeof index !== 'undefined') {
      let collection = this.state.promotion.get(objPath);

      let item = collection.get(index)

      item = Immutable.fromJS(item).merge(entity.delete('__index__'))
      
      let updatedCollection = collection.update(index, _item => item)
      
      obj = obj.set(objPath, updatedCollection)
    } 
    else {
      if (objPath) {
        if (Immutable.Iterable.isIndexed(entity)) {
          obj = obj.set(objPath, entity)
        }
        entity = this.state.promotion.get(objPath).merge(entity)
        obj = obj.set(objPath, entity)
      } else
        obj = obj.merge(entity)
    }

    this.setState({
      promotion: this.state.promotion.merge(obj)
    })
  }

  onSave(res) {
    console.log('Store was notified that a promo page was saved', res)
  }

  onAddBlogPost() {
    let promo = this.state.promotion;

    let blogLinks = promo
      .get('blogLinks')
      .push(Immutable.Map({
        title:'',
        excerpt:'',
        thumbnail:'',
        permaLink:''
      }));
    this.setState({
      promotion: promo.set('blogLinks', blogLinks)
    })
  }

  onRemoveBlogPost(payload) {
    let promo = this.state.promotion;
    let blogLinks = promo.get('blogLinks').delete(payload.index);
    this.setState({
      promotion: promo.set('blogLinks', blogLinks)
    })
  }


  onAddPrimaryListing() {
    let emptyListing = Immutable.Map({
      merchantId:' ',
      offerId: 0,
      promoMerchantZone: 'REGULAR_ZONE'
    })
    let primaryMerchantListings = this.state.promotion.get('primaryMerchantListings')
    this.setState({
      promotion: this.state.promotion.merge({
        primaryMerchantListings: primaryMerchantListings.push(emptyListing)
      })
    })
  }

  onRemovePrimaryListing(payload) {
    let primaryMerchantListings = this.state.promotion.get('primaryMerchantListings')
    this.setState({
      promotion: this.state.promotion.merge({
        primaryMerchantListings: primaryMerchantListings.delete(payload.index)
      })
    })
  }

  onAddFeaturedImage(payload) {
    let promo = this.state.promotion;
    let image = Immutable.Map(payload.image);
    let featuredImages = promo.get('featuredImages');
    image = image.merge({
      imgPath: '',
      startDate: '',
      endDate: '',
      altText: '',
      linkURL: '',
      newWindow: false
    })
    this.setState({
      promotion: promo.set('featuredImages', featuredImages.push(image))
    })
  }

  onRemoveFeaturedImage(payload) {
    let promo = this.state.promotion;
    let featuredImages = promo.get('featuredImages').delete(payload.index);
    this.setState({
      promotion: promo.set('featuredImages', featuredImages)
    })
  }

  onUploadImage(payload){
    if (payload.error) 
      return console.warn(`${payload.image.filename} could not be uploaded`);

    let imageData = payload.image;
    let promo = this.state.promotion;
    let featuredImages = promo.get('featuredImages');
    
    // find the stored image with the filename that
    // came back in the upload response
    let imgIndex = featuredImages.findIndex(image => image.fileName === imageData.filename)

    // add the returned path to the image and get
    // an updated collection
    let updatedImages = featuredImages.update(imgIndex, image => image.set('imgPath', imageData.filepath).set('isUploaded', true))

    this.setState({
      promotion: promo.set('featuredImages', updatedImages)
    })             
  }

  onRemoveBlogPost(payload) {
    let promo = this.state.promotion;
    let blogLinks = promo.get('blogLinks').delete(payload.index);
    this.setState({
      promotion: promo.set('blogLinks', blogLinks)
    })
  }

}

export default PromotionStore;