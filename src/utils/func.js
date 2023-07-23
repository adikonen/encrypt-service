const config = require("../config/main");

/**
 * @param {*} obj 
 * @param {CallableFunction} callback 
 * @param {{ except: string[]; only: string[] }} filterOption IF FILTER OPTION SET, THEN DATA ON NOT FILTERED WILL IGNORED
 * {name: 'konen', age: '19', hobby: 'eat'} if i do some map and filterOption.except = ['name'] then  result {name: 'konen', age: '19ee', hoby: 'eatee'}
 * @returns 
 */
function mapObject(
  obj,
  callback,
  filterOption = {except: null, only: null},
) {
  const mappedObject = {};
  Object.keys(obj).forEach(key => {
    if (filterOption?.except != null && filterOption.except.includes(key)) {
      mappedObject[key] = obj[key];
      return ;
    }
    if (filterOption?.only != null && !filterOption.only.includes(key)) {
      mappedObject[key] = obj[key];
      return ;
    }

    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      mappedObject[key] = mapObject(obj[key], callback, filterOption);
    } else if(Array.isArray(obj[key])) {
      mappedObject[key] = obj[key].map((item) => mapObject(item, callback, filterOption))
    } else {
      mappedObject[key] = callback(obj[key], key);
    }
  });
  return mappedObject;
}

function getRouteLog(request) {
  return `[${request.method}] ${request.url} ${new Date().toLocaleString()} from ${request.headers.origin} 😲`;
}

function ableToDecrypt(value) {
  const length = (Number(config.encrypt_prefix_length) + Number(config.encrypt_suffix_length))
  return typeof value === 'string' && value.length > length 
}

module.exports = {
  mapObject,
  getRouteLog,
  ableToDecrypt
}