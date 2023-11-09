// encryption.js

const crypto = require('crypto');
const config = require('./config.js');

const { secret_key, secret_iv, ecnryption_method } = config

if (!secret_key || !secret_iv || !ecnryption_method) {
  throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
}

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash('sha512')
  .update(secret_key, 'utf-8')
  .digest('hex')
  .substring(0, 32)
const encryptionIV = crypto
  .createHash('sha512')
  .update(secret_iv, 'utf-8')
  .digest('hex')
  .substring(0, 16)

// Encrypt data
function encryptData(data) {
  const cipher = crypto.createCipheriv(ecnryption_method, key, encryptionIV)

  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  var base64String = Buffer.from(encryptedData, 'hex').toString('base64');

  return base64String;
  // return Buffer.from(
  //   cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  // ).toString('base64') // Encrypts data and converts to hex and base64
}

// Decrypt data
function decryptData(encryptedData) {
  const decipher = crypto.createDecipheriv(ecnryption_method, key, encryptionIV);
  let decryptedData = decipher.update(encryptedData, "base64", "utf-8");
  decryptedData += decipher.final("utf8");

  return decryptedData;
  //const buff = Buffer.from(encryptedData, 'base64')
  //return (
  //  decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
  //  decipher.final('utf8')
  // ) // Decrypts data and converts to utf8
}

module.exports = {
  decryptData: decryptData,
  encryptData: encryptData
}