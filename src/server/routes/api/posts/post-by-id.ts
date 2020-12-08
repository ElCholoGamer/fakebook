import express from 'express';
import checkAuth from '../../../middleware/check-auth';
import postGetter from '../../../middleware/post-getter';
import validator from '../../../middleware/validator';
import verification from '../../../middleware/verification';
import PostImage from '../../../models/post-image';
import asyncHandler from '../../../util/async-handler';
import { Types } from 'mongoose';

const router = express.Router({ mergeParams: true });

router.use(postGetter());

// Get a post by ID
router.get(
	'/',
	asyncHandler(async (req, res) => {
		res.json({
			status: 200,
			post: req.post,
		});
	})
);

// Get a post's image
router.get(
	'/image',
	postGetter(),
	asyncHandler(
		async (req, res) => {
			const { post } = req;

			// Check if post has image
			if (!post!.image) {
				return res.status(404).json({
					status: 404,
					message: "Post doesn't have an image",
				});
			}

			// Get post image
			const image = await PostImage.findById(post!._id);
			if (!image) {
				return res.status(404).json({
					status: 404,
					message: 'Image not found',
				});
			}

			// Get values and send response
			const { data, contentType } = image;
			res.contentType(contentType).send(data);
		},
		{
			silent: true,
		}
	)
);

router.use(checkAuth());
router.use(verification());

// Delete a post by ID
router.delete(
	'/',
	postGetter(),
	asyncHandler(
		async (req, res) => {
			const { post } = req;

			if (post!.author._id.toString() !== req.user!._id.toString()) {
				return res.status(401).json({
					status: 401,
					message: 'User is unauthorized',
				});
			}

			if (post!.image) {
				const image = await PostImage.findById(post!._id);
				await image?.deleteOne();
			}

			await post!.deleteOne();
			res.json({
				status: 200,
				message: 'Post deleted successfully',
			});
		},
		{
			silent: true,
			failStatus: 404,
		}
	)
);

// Post a comment
router.post(
	'/',
	validator({
		content: { type: 'string', minLength: 1 },
	}),
	postGetter(),
	asyncHandler(
		async (req, res) => {
			const { post, body } = req;

			// Add comment
			post!.comments.push({
				author: {
					_id: Types.ObjectId(req.user!.id),
					username: req.user!.username,
				},
				content: body.content,
			});

			// Respond with updated post
			await post!.save();
			res.json({
				status: 200,
				post,
			});
		},
		{
			silent: true,
			failStatus: 404,
		}
	)
);

// Like/unlike a post
router.put(
	'/like',
	postGetter(),
	asyncHandler(async (req, res) => {
		const { post } = req;

		// Remove like first
		const prev = [...post!.likes]; // Clones the array
		post!.likes = post!.likes.filter(
			id => id.toString() !== req.user!._id.toString()
		);

		// If nothing changed, add like instead
		if (prev.length === post!.likes.length) {
			post!.likes.push(req.user!._id);
		}

		await post!.save();
		res.json({
			status: 200,
			post,
		});
	})
);

export default router;
