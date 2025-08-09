const Config = require('config');
const JWT = require('jsonwebtoken');
const GetSessionByTokenService = require('#Components/users/services/get-session-by-token.js');
const {AuthorizationError}=require('#Errors')
const {stripToken}=require('#Helpers')

const AuthorizationMiddleware = async (req, _, next) => {
	const now = Date.now();
	const { authorization } = req.headers;
	
	try{
		
		const token=stripToken(authorization)

		JWT.verify(token, Config.get('AUTH.TOKEN_KEY'))


		const session = await GetSessionByTokenService(token,'access');

		if(!session) {
			throw new Error('Authorization error')
		}

		const tokenExpireDate = new Date(session.expire).getTime();

		if(now > tokenExpireDate) {
			throw new Error('Authorization error')
		}

		req.state = { user: session }
		next();
	} catch(error) {
		return next(new AuthorizationError({code:'invalid_token',text:'Токен не валидный'}))
	}

}

module.exports = AuthorizationMiddleware;   