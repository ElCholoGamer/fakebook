import { RequestHandler } from 'express';

interface Options {
	doNext?: boolean;
	silent?: boolean;
	failStatus?: number;
	failMessage?: string;
}

function asyncHandler(
	handler: RequestHandler,
	options: Options = {}
): RequestHandler {
	const {
		doNext = false,
		silent = false,
		failMessage = 'An error occurred!',
		failStatus = 500,
	} = options;

	return async (req, res, next) => {
		try {
			await handler(req, res, next);
		} catch (err) {
			if (!doNext) {
				if (!silent) console.error(err);
				res.status(failStatus).json({
					status: failStatus,
					message: err.message || failMessage,
				});
			} else {
				next(err);
			}
		}
	};
}

export default asyncHandler;
