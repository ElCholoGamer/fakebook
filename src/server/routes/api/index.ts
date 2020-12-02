import express from 'express';
import checkAuth from '../../middleware/check-auth';
import asyncHandler from '../../util/async-handler';
import postsRouter from './posts';
import userRouter from './user';
import avatarRouter from './avatar';
import validator from '../../middleware/validator';

const router = express.Router();

// Sub-routes
router.use('/posts', postsRouter);
router.use('/user', userRouter);
router.use('/avatar', avatarRouter);

// Index API endpoint
router.get('/', (req, res) => res.json({ status: 200, hello: 'world' }));

router.post(
	'/verify',
	checkAuth(),
	validator({ code: 'string' }),
	asyncHandler(async (req, res) => {
		console.log(req.body);
		if (req.user!.verified) {
			return res.status(409).json({
				status: 409,
				message: 'User is already verified',
			});
		}

		if (req.body.code !== req.user!.code) {
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
