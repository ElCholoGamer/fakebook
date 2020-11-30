import express from 'express';
import checkAuth from '../middleware/check-auth';
import validator from '../middleware/validator';
import verification from '../middleware/verification';
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

router.get('/avatar', (req, res) => {
	res.redirect(`/avatar?id=${req.user!._id}`);
});

// Log out user session
router.post('/logout', (req, res) => {
	req.logout();
	res.json({
		status: 200,
		message: 'Logged out successfully',
	});
});

export default router;
