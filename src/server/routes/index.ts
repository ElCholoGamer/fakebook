import express from 'express';
import Avatar from '../models/avatar';
import asyncHandler from '../util/async-handler';

const router = express.Router();

// Get a user's avatar
router.get(
	'/avatar',
	asyncHandler(
		async (req, res) => {
			const { id } = req.query;
			const avatar = await Avatar.findById(id);

			if (!avatar) {
				res.status(404).json({
					status: 404,
					message: 'Avatar not found',
				});
			} else {
				const { contentType, data } = avatar;
				res.contentType(contentType).send(data);
			}
		},
		{ doNext: false, failMessage: 'Avatar not found', failStatus: 404 }
	)
);

export default router;
