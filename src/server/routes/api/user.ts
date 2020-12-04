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
			const user = await User.findById(id);

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
	validator(
		{
			username: { type: 'string', required: false, minLength: 1 },
			bio: { type: 'string', required: false },
		},
		{ allowOther: true }
	),
	asyncHandler(async (req, res) => {
		const { bio = req.user!.bio, username = req.user!.username } = req.body;

		req.user!.username = username.trim();
		req.user!.bio = bio.trim();
		await req.user!.save();

		res.json({
			status: 200,
			user: req.user,
		});
	})
);

export default router;
