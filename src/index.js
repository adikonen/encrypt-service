const http = require('node:http');
const handler = require('./handler/main');
const config  = require('./config/main');
const { Router } = require('./utils/router');

const server = http.createServer((req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  const router = new Router(req, res);

  // if (req.method === 'OPTIONS') {
  //   res.writeHead(200);
  //   res.end();
  //   return;
  // }

  router.get('/', handler.index);
  router.post('/encrypt', handler.encrypt);
  router.post('/decrypt', handler.decrypt);
  router.notFound();
  
  process.on('unhandledRejection', function(reason) {
    console.log('Unhandled Rejection At: ' + reason.stack || reason)
    return res.end(JSON.stringify({
      status: 500,
      message: 'Something went wrong'
    }));
  })

})

server.listen(config.app_port, () => {
  console.log('Uwauu Node Js Berjalan di Port:' + config.app_port + ' 😁');
})
