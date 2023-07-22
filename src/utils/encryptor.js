const config = require("../config/main");
const { createDecipheriv, createCipheriv, scryptSync } = require('node:crypto');

class Encryptor {

  constructor() {
    this.algorithm = 'aes-192-cbc';
    this.secretKey = config.encrypt_secret_key;
    this.salt = config.encrypt_salt;
  }
  /** 
   * @param {string} encryptedText 
   * @returns {string}
   */
  encrypt(password) {
    const key = scryptSync(this.secretKey, this.salt, 24); // Menggunakan secret key sebagai input untuk menghasilkan kunci
    const iv = Buffer.alloc(16, 0); // Vektor inisialisasi (IV)
  
    const cipher = createCipheriv(this.algorithm, key, iv);
    let encrypted = '';
    cipher.setEncoding('hex');
  
    cipher.on('data', chunk => encrypted += chunk);
    // cipher.on('end', () => console.log(encrypted));
  
    cipher.write(password);
    cipher.end();
  
    return encrypted; // Hasil enkripsi yang akan disimpan di database
  }

  decrypt(encryptedPassword) {
    const key = scryptSync(this.secretKey, this.salt, 24);
    const iv = Buffer.alloc(16, 0);
  
    const decipher = createDecipheriv(this.algorithm, key, iv);
    let decrypted = '';
    decipher.on('readable', () => {
      let chunk;
      while (null !== (chunk = decipher.read())) {
        decrypted += chunk.toString('utf8');
      }
    });
    // decipher.on('end', () => console.log(decrypted));
  
    decipher.write(encryptedPassword, 'hex');
    decipher.end();
  
    return decrypted;
  }
  
}

const encryptor = new Encryptor()

module.exports = {
  encryptor
}