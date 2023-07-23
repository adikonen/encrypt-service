const http = require('http')
const { mapObject, ableToDecrypt } = require('../utils/func')
const { encryptor } = require('../utils/encryptor')

function index(request, response) {
  return {
    message: 'Hello World'
  }
}

/**
 * encrypt value the request body. example:
 * request: {
 * user: 'addy konen',
 * age: 18,
 * }
 * response: {
 * user: 'encrypted-text',
 * age: 'encrypted-text'
 * }
 * 
 * @param {http.IncomingMessage|{body}} request 
 * @param {http.ServerResponse} response 
 */
function encrypt(request, response) {
  if (Array.isArray(request.body)) {
    return request.body.map((item) => mapObject(item, (value) => encryptor.encrypt(value)));
  }
  return mapObject(request.body, (value, key) => encryptor.encrypt(value));
}

/**
 * decrypt value the request body
 * 
 * @param {http.IncomingMessage|{body}} request 
 * @param {http.ServerResponse} response 
 */
function decrypt(request, response) {
  const {data} = request.body;
  const action = (item) => {
    return mapObject(item, (value) => {
      return ableToDecrypt(value) ? encryptor.decrypt(value) : value
    })
  }
  if (Array.isArray(data)) {
    return data.map((item) => action(item));
  }
  return action(data);
}


module.exports = {
  encrypt,
  decrypt,
  index
}