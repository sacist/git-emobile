const Config = require('config');
const JWT = require('jsonwebtoken');
const GetSessionByTokenService = require('#Components/users/services/get-session-by-token.js');

const AuthorizationMiddleware = async (req, res, next) => {
	const now = Date.now();
	const { authorization } = req.headers;

	try{
		JWT.verify(authorization, Config.get('AUTH.TOKEN_KEY'))
		
		const session = await GetSessionByTokenService(authorization);

		if(!session) {
			throw new Error('Authorization error')
		}

		const tokenExpireDate = new Date(session.expire).getTime();

		if(now > tokenExpireDate) {
			throw new Error('Authorization error')
		}

		req.state = { user: session }
	} catch(error) {
		return res.status(401).send(error.message);
	}

	next();
}

module.exports = AuthorizationMiddleware;   