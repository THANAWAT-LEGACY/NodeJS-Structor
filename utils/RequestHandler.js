const _ = require('lodash');

class RequestHandler {
	constructor(logger) {
		this.logger = logger;
	}
	validateJoi(err, status, errorMessage) {
		// if (err) { this.logger.log(`error in validating request : ${errorMessage}`, 'warn'); }
		// return !_.isNull(err) ? this.throwError(status, errorType, errorMessage)() : '';
		return !_.isNull(err) ?
			res.status(status).json({
				status: false,
				message: errorMessage,
				data: null
			})
			:
			''
	}
	sendSuccess(res, message, status) {
		// this.logger.log(`a request has been made and proccessed successfully at: ${new Date()}`, 'info');
		return (data = null) => {
			if (_.isUndefined(status)) {
				status = true;
			}
			res.status(200).json({
				status,
				message,
				data
			});
		};
	}

	sendError(req, res, error) {
		// this.logger.log(`error ,Error during processing request: ${`${req.protocol}://${req.get('host')}${req.originalUrl}`} details message: ${error.message}`, 'error');
		return res.status(500).json({
			status: false,
			message: error.message || error.message || 'Unhandled Error',
			data: null,
		});
	}
}
module.exports = RequestHandler;
