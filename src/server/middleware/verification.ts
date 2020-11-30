import { RequestHandler } from 'express';

interface Options {
	failStatus?: number;
	failMessage?: string;
	bypassPaths?: string[];
}

function verification(options: Options = {}): RequestHandler {
	const {
		failStatus = 401,
		failMessage = 'User must be verified',
		bypassPaths = [],
	} = options;

	return (req, res, next) => {
		if (!bypassPaths.includes(req.path) && !req.user?.verified) {
			res.status(failStatus).json({
				status: failStatus,
				message: failMessage,
			});
		} else {
			next();
		}
	};
}

export default verification;
