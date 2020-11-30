import { RequestHandler } from 'express';

interface Options {
	responseStatus?: number;
	responseMessage?: string;
}

function checkAuth(options: Options = {}): RequestHandler {
	const {
		responseStatus = 401,
		responseMessage = 'User is not authenticated',
	} = options;

	return (req, res, next) => {
		if (!req.isAuthenticated()) {
			res.status(responseStatus).json({
				status: responseStatus,
				message: responseMessage,
			});
		} else {
			next();
		}
	};
}

export default checkAuth;
