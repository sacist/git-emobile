const BaseError = require('#Classes/base-error')

class AuthorizationError extends BaseError {
	
	constructor(errorsData) {
		super('Authorization error', errorsData);
		this.statusCode = 401;
	}
}

module.exports = AuthorizationError;