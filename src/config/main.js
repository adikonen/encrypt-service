const dotenv = require('dotenv')
dotenv.config()

const config = {
  app_port: process.env.APP_PORT ?? 3000,
  encrypt_secret_key: process.env.ENCRYPT_SECRET_KEY ?? 'coba tebak 🔐',
  encrypt_salt: process.env.ENCRYPT_SALT ?? 'asin sekali🧂😁',
  encrypt_prefix_length: process.env.ENCRYPT_PREFIX_LENGTH ?? 2,
  encrypt_suffix_length: process.env.ENCRYPT_SUFFIX_LENGTH ?? 4,
  encrypt_algorithm: process.env.ENCRYPT_ALGORITHM ?? 'aes-192-cbc'
}

module.exports = config