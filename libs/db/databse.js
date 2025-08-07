const pgPromise = require('pg-promise');
const c = require('config');

let pgpInstance;
let clientInstance;

if (!global.__pgp) {
  pgpInstance = pgPromise();
  clientInstance = pgpInstance(c.get('DATABASE'));
  global.__pgp = pgpInstance;
  global.__client = clientInstance;
} else {
  pgpInstance = global.__pgp;
  clientInstance = global.__client;
}

module.exports = { client: clientInstance };
