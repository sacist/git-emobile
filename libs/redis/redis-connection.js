const IORedis = require('ioredis');
const Config = require('config');

const Redis = new IORedis({
	port: Config.get('REDIS.PORT'),
	host: Config.get('REDIS.HOST'),
	password: Config.get('REDIS.PASSWORD'),
	db: Config.get('REDIS.DB'),
});

console.log('Redis connected')

module.exports = Redis;