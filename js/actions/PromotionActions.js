import { Actions }  from 'flummox';
import APIUtils     from '../utils/WebAPIUtils';
import request from '../utils/request';

class PromotionActions extends Actions {
 
  constructor() { 
    super();
  }

  create() { 
    return {};
  }  

  save(entity) {

    // transform affiliate categories
    let cats = entity
                .get('affiliateCategories')
                .split(',')
                .map(c => c.trim())
                .filter(c => c !== '')
    
    entity = entity.set('affiliateCategories', cats)
    
    return APIUtils.send('/promos', entity);
  }

  async getAll(params) {
    let res = await APIUtils.get('/promos', params);
    if (res.status === 200)
      return Promise.resolve(res.body);
    return Promise.reject(res.error)
  }

  update(entity, objPath, index) {
    if (typeof index !== 'undefined')
      entity['__index__'] = index;

    return {
      entity: entity,
      objPath: objPath
    }
  }

  updatePromo(payload) {
    return payload;
  }

  copyPromo() {
    return true;
  }

  deletePromo(params) {
    let res = APIUtils.remove('/promos', params)
    if (res.status === 204) {
      return {
        id: params.id
      }  
    }
  }

  addBlogPost(post) {
    return {};
  }

  removeBlogPost(index) {
    return {
      index: index
    }
  }

  addPrimaryListing(listing) {
    return {};
  }

  removePrimaryListing(index) {
    return {
      index: index
    }
  }

  addFeaturedImage(image) {
    return {
      image: image
    }
  }

  receiveLocalImages(images) {
    let reader = new FileReader();
    let imageCount = images.length;
    let i = 0;

    reader.onload = function(upload){
      let image = images[i];
      image.dataURI = upload.target.result;
      image.isUploaded = false;
      image.fileName = image.name;
      this.readLocalImage(image)

      i += 1;
      if (i < imageCount)
        reader.readAsDataURL(images[i]);
    }.bind(this);
    
    reader.readAsDataURL(images[i]);
  }

  readLocalImage(image) {
    this.uploadImage(image);
    return {
      image: image
    }
  }

  async uploadImage(image) {
    if (image.isUploaded) return
    let formdata = new FormData();


    let res = await request
      .post('/balefire/api/upload')
      .attach('images[]', image, image.fileName)
      .exec()
      .catch(error => {
        return {
          error: error
        }
      })

    if (res.error) {
      console.error(res.error)
      return {
        error: res.error,
        image: {
          filename: image.filename
        }
      }
    }

    return {
      error: false,
      image: {
        filepath: res.body[0].filepath,
        filename: res.body[0].filename
      }
    }
  }

  removeFeaturedImage(index) {
    return {
      index: index
    }
  }

}

export default PromotionActions;