const BaseError = require('#Classes/base-error')

class ConflictError extends BaseError {
	
	constructor(errorsData) {
		super('conflict', errorsData);
		this.statusCode = 409;
	}
}

module.exports = ConflictError;