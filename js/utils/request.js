/*
 * Superagent promisification
 */
import request, {Request} from 'superagent';

Request.prototype.exec = function() {
  let req = this;

  return new Promise ((resolve, reject) => {
    req.end((error, res) => {
      if (error) {
        reject(error)
      }
      else if (res.status !== 200 && res.status !== 201) {
        reject(res.body ? res.body : res.error)
      }
      else 
        resolve(res)
    });
  });
};

export default request;