function mapObject(obj, callback) {
  const mappedObject = {};
  Object.keys(obj).forEach(key => {
    mappedObject[key] = callback(obj[key], key);
  });
  console.log(mappedObject);
  return mappedObject;
}

function getRouteLog(request) {
  return `[${request.method}] ${request.url} ${new Date().toLocaleString()} from ${request.headers.origin} 😲`;
}


module.exports = {
  mapObject,
  getRouteLog
}