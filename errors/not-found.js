const BaseError = require('#Classes/base-error')

class NotFoundError extends BaseError {
	
	constructor(errorsData) {
		super('data not found', errorsData);
		this.statusCode = 404;
	}
}

module.exports = NotFoundError;