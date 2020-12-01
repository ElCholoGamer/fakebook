import express from 'express';
import checkAuth from '../../middleware/check-auth';
import asyncHandler from '../../util/async-handler';
import postsRouter from './posts';
import usersRouter from './user';
import avatarRouter from './avatar';

const router = express.Router();

router.use(checkAuth()); // Check that user is logged in

// Sub-routes
router.use('/posts', postsRouter);
router.use('/user', usersRouter);
router.use('/avatar', avatarRouter);

// Index API endpoint
router.get('/', (req, res) => res.json({ status: 200, hello: 'world' }));

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

export default router;
