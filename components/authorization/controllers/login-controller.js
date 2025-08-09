const BaseController = require('#Classes/base-controller');
const GetTokens = require('#Components/users/services/get-user-tokens.js');
const getUsersByEmailAndPasswordService=require('#Components/users/services/get-user-by-email-password.js')
const {NotFoundError}=require('#Errors')

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

	async controller(req,res,next) {
		const { email, password } = req.body;

		const user = await getUsersByEmailAndPasswordService(email, password);

		if(!user) {
			return next(new NotFoundError({ code: 'user_not_found', text: 'Пользователь не найден' }))
		}

		const session = {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			role:user.role
		}

		const tokens = await GetTokens(session);

		return tokens
	}
}

module.exports = new LoginController().run;