const ErrorsMiddleware = (error, req, res, next) => {
	console.log(error);
	if(error.statusCode) {
		return res.status(error.statusCode).send({
			code: error.code,
			text: error.text,
			data: error.data
		});
	}

	return res.status(500).send('Technical error');
}

module.exports = ErrorsMiddleware