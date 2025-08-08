const BaseController = require('#Classes/base-controller');
const GetTokens = require('#Components/users/services/get-user-tokens.js');
const getUsersByEmailAndPasswordService=require('#Components/users/services/get-user-by-email-password.js')


class LoginController extends BaseController {
	get bodySchema() {
		return {
			type: 'object',
			additionalProperties: false,
			required: ['email', 'password'],
			properties: {
				email: { type: 'string', format: 'email' },
				password: { type: 'string' }
			}
		}
	}

	async controller(req) {
		const { email, password } = req.body;

		const user = await getUsersByEmailAndPasswordService(email, password);

		if(!user) {
			return {
				result:'Password or email is incorrect',
				code:401
			}
		}

		const session = {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
		}

		const tokens = await GetTokens(session);

		return {
			result:tokens
		}
	}
}

module.exports = new LoginController().run;