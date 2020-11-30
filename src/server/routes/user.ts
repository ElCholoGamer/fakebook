import express from 'express';
import checkAuth from '../middleware/check-auth';
import validator from '../middleware/validator';
import User from '../models/user';
import asyncHandler from '../util/async-handler';

const router = express.Router();

router.use(checkAuth()); // Check that user is authenticated

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
		let { username, bio } = req.body;
		username = username.trim();

		// If username is different, check if it's unique
		if (username !== req.user!.username) {
			const existing = await User.findOne({ username });
			if (existing) {
				return res.status(400).json({
					status: 400,
					message: 'Username already exists',
				});
			}
		}

		req.user!.username = username || req.user!.username;
		req.user!.bio = bio || req.user!.bio;
		await req.user!.save();

		res.json({
			status: 200,
			user: req.user,
		});
	})
);

router.get(
	'/verify',
	asyncHandler(async (req, res) => {
		const { code = '' } = req.query;
		if (code !== req.user!.code) {
			return res.redirect('/');
		}

		req.user!.verified = true;
		delete req.user!.code;
		await req.user!.save();

		res.redirect('/');
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
