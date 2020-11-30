import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import checkAuth from '../middleware/check-auth';
import validator from '../middleware/validator';
import verification from '../middleware/verification';
import Avatar from '../models/avatar';
import asyncHandler from '../util/async-handler';

const router = express.Router();

router.use(checkAuth()); // Check that user is authenticated
router.use(verification({ bypassPaths: ['/', '/verify'] })); // Check that user is verified

// Get user info
router.get('/', (req, res) => res.json({ status: 200, user: req.user }));

// Update user info
router.put(
	'/',
	validator({
		username: { type: 'string', required: false, minLength: 1 },
		bio: { type: 'string', required: false },
	}),
	asyncHandler(async (req, res) => {
		const { bio = req.user!.bio, username = req.user!.username } = req.body;

		req.user!.username = username;
		req.user!.bio = bio;
		await req.user!.save();

		res.json({
			status: 200,
			user: req.user,
		});
	})
);

router.post(
	'/verify',
	asyncHandler(async (req, res) => {
		if (req.user!.verified) {
			return res.status(409).json({
				status: 409,
				message: 'User is already verified',
			});
		}

		if (req.query.code !== req.user!.code) {
			return res.status(401).json({
				status: 401,
				message: 'Invalid code',
			});
		}

		req.user!.verified = true;
		req.user!.code = undefined;
		await req.user!.save();

		res.json({
			status: 200,
			message: 'User verified successfully',
		});
	})
);

// Get user avatar
router.get('/avatar', (req, res) => {
	res.redirect(`/avatar?id=${req.user!._id}`);
});

const upload = multer();
router.put(
	'/avatar',
	upload.single('avatar'),
	asyncHandler(async (req, res) => {
		const { file } = req;
		if (!file) {
			return res.status(400).json({
				status: 400,
				message: 'Missing "avatar" request property',
			});
		}

		const { buffer, mimetype } = file;
		if (!mimetype.startsWith('image')) {
			return res.status(400).json({
				status: 400,
				message: '"avatar" file mimetype must be of type "image"',
			});
		}

		const resized = await sharp(buffer).resize(256, 256).toBuffer();
		const avatar =
			(await req.user!.getAvatar()) || new Avatar({ _id: req.user!._id });

		avatar.data = resized;
		avatar.contentType = mimetype;
		await avatar.save();

		res.json({
			status: 200,
			message: 'Avatar updated successfully',
		});
	})
);

// Log out user session
router.post('/logout', (req, res) => {
	req.logout();
	res.json({
		status: 200,
		message: 'Logged out successfully',
	});
});

export default router;
