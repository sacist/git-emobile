const BaseController = require('#Classes/base-controller')
const GetSessionByTokenService = require('#Components/users/services/get-session-by-token.js');
const jwt = require('jsonwebtoken')
const Config = require('config');
const DateFns = require('date-fns');
const GetTokens = require('#Components/users/services/get-user-tokens.js');
const { AuthorizationError } = require('#Errors')

class GetNewTokensController extends BaseController {
    get bodySchema() {
        return {
            type: 'object',
            additionalProperties: false,
            required: ['refresh_token'],
            properties: {
                refresh_token: {
                    type: "string",
                    pattern: "^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+$"
                }
            }
        }
    }
    async controller(req,res,next) {
        try {
            const { refresh_token } = req.body
            jwt.verify(refresh_token, Config.get('AUTH.REFRESH_TOKEN_KEY'))

            const session = await GetSessionByTokenService(refresh_token);
            if (!session) {
                return next(new AuthorizationError({ code: 'session_invalid', text: 'Сессия неверна' }))
            }
            const isExpired = DateFns.isBefore(session.expire, new Date());
            if (isExpired) {
                return next(new AuthorizationError({ code: 'auth_expired', text: 'Токен истёк' }))
            }
            const tokens = await GetTokens(session);
            return tokens
        } catch (e) {
            throw e
        }
    }
}

module.exports = new GetNewTokensController().run