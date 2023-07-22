const dotenv = require('dotenv')
dotenv.config()

const config = {
  app_port: process.env.APP_PORT ?? 3000,
  encrypt_secret_key: process.env.ENCRYPT_SECRET_KEY ?? 'secret',
  encrypt_salt: process.env.ENCRYPT_SALT ?? 'garam-asin'
}

module.exports = config