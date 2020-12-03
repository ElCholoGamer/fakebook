import express from 'express';
import checkAuth from '../../middleware/check-auth';
import validator from '../../middleware/validator';
import verification from '../../middleware/verification';
import Post from '../../models/post';
import asyncHandler from '../../util/async-handler';
import multer from 'multer';
import PostImage from '../../models/post-image';
import postGetter from '../../middleware/post-getter';

const router = express.Router();

// Get all posts
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const posts = await Post.find();
		res.json({ status: 200, posts });
	})
);

// Get a post by ID
router.get(
	'/:id',
	postGetter(),
	asyncHandler(async (req, res) => {
		res.json({
			status: 200,
			post: req.post,
		});
	})
);

// Get a post's image
router.get(
	'/:id/image',
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
					message: 'Image not foundx',
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

// Upload a new post
const upload = multer();
router.post(
	'/',
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

// Delete a post by ID
router.delete(
	'/:id',
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
	'/:id',
	validator({
		content: { type: 'string', minLength: 1 },
	}),
	postGetter(),
	asyncHandler(
		async (req, res) => {
			const { post } = req;

			// Add comment
			const { content } = req.body;
			post!.comments.push({
				author: {
					_id: req.user!.id,
					username: req.user!.username,
				},
				content,
			});
			await post!.save();

			// Respond with updated post
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

export default router;
