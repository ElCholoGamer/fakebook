import express from 'express';
import checkAuth from '../../../middleware/check-auth';
import validator from '../../../middleware/validator';
import verification from '../../../middleware/verification';
import Post from '../../../models/post';
import asyncHandler from '../../../util/async-handler';
import multer from 'multer';
import PostImage from '../../../models/post-image';
import idRouter from './post-by-id';

const router = express.Router();

router.use('/:id', idRouter);

// Get all posts
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const posts = await Post.find();
		res.json({ status: 200, posts });
	})
);

// Upload a new post
const upload = multer();
router.post(
	'/',
	checkAuth(),
	verification(),
	upload.single('image'),
	validator({
		title: { type: 'string', minLength: 1 },
		content: { type: 'string', required: false },
	}),
	asyncHandler(async (req, res) => {
		const {
			body: { title, content },
			file,
		} = req;
		const validImage = !!file?.mimetype.startsWith('image');

		// Create and save post document
		const post = new Post({
			title,
			content,
			author: {
				_id: req.user!.id,
				username: req.user!.username,
			},
			image: validImage,
		});
		await post.save();

		// Store image if present
		if (validImage) {
			// Check file mimetype
			const { mimetype, buffer } = file;
			if (!mimetype.startsWith('image')) {
				return res.status(400).json({
					status: 400,
					message: 'File "image" must be of mimetype "image/*"',
				});
			}

			// Create and save image document
			const picture = new PostImage({
				_id: post._id,
				data: buffer,
				contentType: mimetype,
			});
			await picture.save();
		}

		res.json({
			status: 200,
			id: post._id,
		});
	})
);

export default router;
