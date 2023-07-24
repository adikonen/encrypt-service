const http = require('node:http');
const { getRouteLog } = require('./func');
const { ClientError } = require('../error/client-error');

class Router {

  /**
   * @param {http.IncomingMessage} request 
   * @param {http.ServerResponse} response 
   */
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.found = false;
  }

  match(method, url, callback) {
    if (this.request.url === url && (this.request.method === method) ) {
      this.found = true;
      let response = null;  
      let body = '';
      this.request.on('data', (chunk) => {
        body += chunk.toString();
      })
      this.request.on('end', () => {
        try {
          let result = body != '' ? JSON.parse(body) : ''
          response = callback({...this.request, body: result}, this.response);
        } catch (error) {         
          let code = null;
          code = error instanceof ClientError ? 400 : 500;
          this.response.writeHead(code, {'Content-Type': 'application/json'});
          this.response.end(JSON.stringify({status: code, message: error.message}));
          console.error(error.message);
          return ;
        } finally {
          console.log(getRouteLog(this.request));
        }
        this.response.writeHead(200, {'Content-Type': 'application/json'});
        this.response.end(JSON.stringify({
          status: 200,
          data: response
        }));
      });
    }
  }

  get(url, callback) {
    return this.match('GET',url, callback);
  }

  post(url, callback) {
    return this.match('POST', url, callback);
  }

  notFound() {
    if (!this.found) {
      this.response.writeHead(404, {'Content-Type': 'application/json'});
      console.log(getRouteLog(this.request));
      return this.response.end(JSON.stringify({status: 404, message: 'Not Found'}));
    }
  }
}

module.exports = {
  Router
};