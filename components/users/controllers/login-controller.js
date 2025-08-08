const BaseController = require('#Classes/BaseController');
const GetTokens = require('../Services/get-user-tokens.js');



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

		const user = await GetUsersByEmailAndPAsswordService(email, password);

		if(!user) {
			return 'Password or email is incorrect'
		}

		const session = {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
		}

		const tokens = GetTokens(session);

		return tokens
	}
}

module.exports = new LoginController();