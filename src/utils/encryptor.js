const config = require("../config/main");
const { createDecipheriv, createCipheriv, scryptSync } = require('node:crypto');

class Encryptor {

  constructor() {
    this.algorithm = config.encrypt_algorithm;
    this.secretKey = config.encrypt_secret_key;
    this.salt = config.encrypt_salt;
  }
  /** 
   * @param {string} encryptedText 
   * @returns {string}
   */
  encrypt(password) {
    password = '' + password; // force to string
    const key = scryptSync(this.secretKey, this.salt, 24); // Menggunakan secret key sebagai input untuk menghasilkan kunci
    const iv = Buffer.alloc(16, 0); // Vektor inisialisasi (IV)
  
    const cipher = createCipheriv(this.algorithm, key, iv);
    let encrypted = '';
    cipher.setEncoding('hex');
  
    cipher.on('data', chunk => encrypted += chunk);
  
    cipher.write(password);
    cipher.end();
  
    return encrypted; // Hasil enkripsi yang akan disimpan di database
  }

  decrypt(encryptedPassword) {
    const key = scryptSync(this.secretKey, this.salt, 24);
    const iv = Buffer.alloc(16, 0);
    const decipher = createDecipheriv(this.algorithm, key, iv);
    try {
      let dec = decipher.update(encryptedPassword,'hex','utf8');
      dec += decipher.final('utf8');
      return dec;
    } catch (error) {
      throw new Error(`failed to decrypt ${encryptedPassword}`);
    }
  }
  
}

const encryptor = new Encryptor()

module.exports = {
  encryptor
}