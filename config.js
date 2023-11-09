// config.js

const S_KEY = 'MySecretKeyForEncryptionAndDecry';
const S_IV = 'helloworldhellow';
const ECNRYPTION_METHOD = 'aes-256-cbc';
const ACCESS_TOKEN = 'e31f8bfec6f6b029ec144961edb9fa0718637922160166b7b5a6ad29eb27790ef2aaf4ba31da4f20e7b85b761e14c84413afac65dec5da53d812da880f220cb1';


module.exports = {
  secret_key: S_KEY,
  secret_iv: S_IV,
  ecnryption_method: ECNRYPTION_METHOD,
  access_token: ACCESS_TOKEN
}