import { RequestHandler } from 'express';
import Post from '../models/post';
import asyncHandler from '../util/async-handler';

interface Options {
	failStatus?: number;
	failMessage?: string;
	errorMessage?: string;
}

function postGetter(options: Options = {}): RequestHandler {
	const {
		failStatus = 404,
		failMessage = 'Post by ID "[id]" not found',
		errorMessage = 'Post not found',
	} = options;

	return asyncHandler(
		async (req, res, next) => {
			const { id } = req.params;
			console.log('ID:', id);
			const post = await Post.findById(id);

			if (!post) {
				return res.status(failStatus).json({
					status: failStatus,
					message: failMessage.replace(/\[id\]/g, id),
				});
			}

			req.post = post;
			next();
		},
		{
			silent: true,
			failStatus,
			failMessage: errorMessage,
		}
	);
}

export default postGetter;
