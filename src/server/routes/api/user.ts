import express from 'express';
import checkAuth from '../../middleware/check-auth';
import validator from '../../middleware/validator';
import verification from '../../middleware/verification';
import User from '../../models/user';
import asyncHandler from '../../util/async-handler';

const router = express.Router();

// Get user info
router.get(
	'/',
	checkAuth(),
	asyncHandler(async (req, res) => {
		console.log('A');
		res.json({
			status: 200,
			user: req.user,
		});
	})
);

// Get another user's info
router.get(
	'/:id',
	asyncHandler(
		async (req, res) => {
			const { id } = req.params;
			if (id && !req.user?.verified) {
				return res.status(401).json({
					status: 401,
					message: 'User is not verified',
				});
			}

			const user = await User.findById(id || req.user!.id);
			if (!user?.verified) {
				res.status(404).json({
					status: 404,
					message: `User by ID "${id}" not found`,
				});
			} else {
				res.json({
					status: 200,
					user,
				});
			}
		},
		{
			silent: true,
			failStatus: 400,
		}
	)
);

// Update user info
router.put(
	'/',
	checkAuth(),
	verification(),
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

export default router;
