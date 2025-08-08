const Crypto = require('crypto');
const Config = require('config');

const SHA256 = (string) => Crypto.createHmac('sha256', Config.get('AUTH.PASSWORD_KEY'))
	.update(string)
	.digest('hex');

module.exports = SHA256;