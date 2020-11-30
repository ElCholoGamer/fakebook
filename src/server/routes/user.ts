import express from 'express';
import checkAuth from '../middleware/check-auth';
import validator from '../middleware/validator';
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

router.get(
	'/verify',
	asyncHandler(async (req, res) => {
		const { code = '' } = req.query;
		if (code !== req.user!.code) {
			return res.status(401).json({
				status: 401,
				message: 'Invalid code',
			});
		}

		req.user!.verified = true;
		delete req.user!.code;
		await req.user!.save();

		res.json({
			status: 200,
			message: 'User verified successfully',
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
