import express from 'express';
import verification from '../../middleware/verification';
import Post from '../../models/post';
import asyncHandler from '../../util/async-handler';

const router = express.Router();

router.use(verification()); // Check that user is verified

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const posts = await Post.find();
		res.json({ status: 200, posts });
	})
);

router.get(
	'/:id',
	asyncHandler(
		async (req, res) => {
			const { id } = req.params;
			const post = await Post.findById(id);

			if (!post) {
				res.status(404).json({
					status: 404,
					message: `Post by ID "${id}" not found`,
				});
			} else {
				res.json({
					status: 200,
					post,
				});
			}
		},
		{
			silent: true,
			failStatus: 400,
		}
	)
);

export default router;
