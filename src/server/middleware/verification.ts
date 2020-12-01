import { RequestHandler } from 'express';

interface Options {
	failStatus?: number;
	failMessage?: string;
	bypass?: string[];
}

function verification(options: Options = {}): RequestHandler {
	const {
		failStatus = 401,
		failMessage = 'User is not verified',
		bypass = [],
	} = options;

	return (req, res, next) => {
		if (
			!bypass.includes(req.path) &&
			(!req.isAuthenticated() || !req.user?.verified)
		) {
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
