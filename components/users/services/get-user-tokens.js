const Config = require('config');
const JWT = require('jsonwebtoken');
const DateFns = require('date-fns');
const {client}=require('#Libs/db/databse.js')
const redis=require('#Libs/redis/redis-connection.js')

const GetTokens = async (session) => {
	const now = new Date();
	
	const tokensData = {
		...session,
		expire: DateFns.addDays(now, 7),
	}

	const refreshTokensData = {
		...session,
		expire: DateFns.addDays(now, 30),
	}

	const token = JWT.sign(tokensData, Config.get('AUTH.TOKEN_KEY'));
	const refreshToken = JWT.sign(refreshTokensData, Config.get('AUTH.REFRESH_TOKEN_KEY'));
	await client.none(
		`INSERT INTO refresh_tokens (user_id, token, expire) VALUES ($1, $2, $3)`,
		[session.id, refreshToken, refreshTokensData.expire]
	);
	await redis.set(`token_${token}`, JSON.stringify(tokensData));

	return { token, refreshToken };
}


module.exports = GetTokens;