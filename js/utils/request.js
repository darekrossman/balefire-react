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
      else 
        resolve(res)
    });
  });
};

export default request;