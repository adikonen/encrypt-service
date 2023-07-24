const config = require('../src/config/main');
const assert = require('node:assert').strict;
const { encryptor } = require('../src/utils/encryptor')

const http = require('node:http');
const { mapObject, ableToDecrypt } = require('../src/utils/func');

const encryptorTest = [
  function test_encrypted_data_should_be_not_same_as_before() {
    let str = 'halo dunia!';
    let encrypted = encryptor.encrypt(str);
    assert.notEqual(str, encrypted);
  },
  function test_encrypt_then_decrypt_data_should_be_same_as_after_decrypt() {
    let str = 'halo dunia!';
    let encrypted = encryptor.encrypt(str);
    let decrypted = encryptor.decrypt(encrypted);
    assert.equal(str, decrypted);
  },
  function test_decrypt_throw_error_if_failed() {
    let str = '123456';
    assert.throws(() => {
      encryptor.decrypt(str);
    })
  },
];

const funcTest = [
  function test_encrypted_text_is_able_to_decrypt() {
    let str = encryptor.encrypt('halo dunia');
    assert.equal(ableToDecrypt(str), true);
  },
  function test_normal_text_not_able_to_decrypt() {
    let str = 'halo dunia';
    assert.notEqual(ableToDecrypt(str), true);
  },
  function test_non_string_not_able_to_decrypt() {
    let bool = true;
    let num = '123';
    let nill = null;

    assert.notEqual(ableToDecrypt(bool), true);
    assert.notEqual(ableToDecrypt(num), true);
    assert.notEqual(ableToDecrypt(nill), true);
  },
  function test_map_object_basic() {
    let object = {name: 'konen', email: 'konen@gmail.com'};
    let newObject = mapObject(object, (objectValue) => objectValue+'eee');
    assert.deepEqual(newObject, {name: 'koneneee', email: 'konen@gmail.comeee'})
  },
  function test_map_object_encrypt() {
    let object = {name: 'konen', email: 'konen@gmail.com'};
    let newObject = mapObject(object, (objectValue) => encryptor.encrypt(objectValue));
    for (key in newObject) {
      assert.equal(ableToDecrypt(newObject[key]), true)
    }
  },
];

encryptorTest.forEach((test) => {
  console.log(test.name);
  test();
})

funcTest.forEach((test) => {
  console.log(test.name);
  test();
})
