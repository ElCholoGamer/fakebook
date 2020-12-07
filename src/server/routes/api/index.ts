import express from 'express';
import asyncHandler from '../../util/async-handler';
import postsRouter from './posts';
import userRouter from './user';
import avatarRouter from './avatar';

const router = express.Router();

// Sub-routes
router.use('/posts', postsRouter);
router.use('/user', userRouter);
router.use('/avatar', avatarRouter);

// Index API endpoint
router.get('/', (req, res) => res.json({ status: 200, hello: 'world' }));

// Verify user
router.get(
	'/verify',
	asyncHandler(async (req, res) => {
		if (!req.user || req.user.verified || req.query.code !== req.user.code) {
			return res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ'); // yes
		}

		req.user!.verified = true;
		req.user!.code = undefined;
		await req.user!.save();

		res.redirect('/verify-success');
	})
);

export default router;
