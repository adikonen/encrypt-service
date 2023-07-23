const http = require('http')
const { mapObject } = require('../utils/func')
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
  console.log(data)
  if (Array.isArray(data)) {
    return data.map((item) => mapObject(item, (value) => encryptor.decrypt(value)));
  }
  return mapObject(data, (value, key) => encryptor.decrypt(value));
}


module.exports = {
  encrypt,
  decrypt,
  index
}