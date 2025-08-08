const BaseController = require('#Classes/base-controller')
const GetSessionByTokenService = require('#Components/users/services/get-session-by-token.js');
const jwt = require('jsonwebtoken')
const Config = require('config');
const DateFns = require('date-fns');
const GetTokens = require('#Components/users/services/get-user-tokens.js');

class GetNewTokensController extends BaseController {
    get bodySchema() {
        return {
            type: 'object',
            additionalProperties: false,
            required: ['refresh_token'],
            properties: {
                refresh_token: { type: "string" }
            }
        }
    }
    async controller(req) {
        try {
            const { refresh_token } = req.body
            jwt.verify(refresh_token, Config.get('AUTH.REFRESH_TOKEN_KEY'))

            const session = await GetSessionByTokenService(refresh_token);
            if (!session) {
                return {
                    result: 'auth is required',
                    code: 401
                }
            }
            const isExpired = DateFns.isBefore(session.expire, new Date());
            if (isExpired) {
                return {
                    result: { message: 'authorization is expired' },
                    code: 401
                }
            }
            const tokens = await GetTokens(session);
            return {
                result: tokens
            }
        } catch (e) {
            throw e
        }
    }
}

module.exports = new GetNewTokensController().run