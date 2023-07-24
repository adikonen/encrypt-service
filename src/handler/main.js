const http = require('node:http')
const { mapObject, ableToDecrypt } = require('../utils/func')
const { encryptor } = require('../utils/encryptor');
const { ClientError } = require('../error/client-error');

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
  const { data, ignore = null } = request.body;

  if (data == null) {
    throw new ClientError('wrap your body request to data property, ex: {data: {something}}')
  }

  if (Array.isArray(data)) {
    return data.map((item) => mapObject(item, (value) => encryptor.encrypt(value), {except: ignore}));
  }
  return mapObject(data, (value, key) => encryptor.encrypt(value), {except: ignore});
}

/**
 * decrypt value the request body
 * 
 * @param {http.IncomingMessage|{body}} request 
 * @param {http.ServerResponse} response 
 */
function decrypt(request, response) {
  const { data, ignore = null } = request.body;

  if (data == null) {
    throw new ClientError('wrap your body request to data property, ex: {data: {something}}')
  }
  
  const action = (item) => {
    return mapObject(item, (value) => {
      return ableToDecrypt(value) ? encryptor.decrypt(value) : value
    }, {except: ignore})
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