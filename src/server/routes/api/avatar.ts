import express from 'express';
import Avatar from '../../models/avatar';
import asyncHandler from '../../util/async-handler';
import multer from 'multer';
import sharp from 'sharp';
import verification from '../../middleware/verification';

const router = express.Router();

router.get(
	'/',
	asyncHandler(
		async (req, res) => {
			const { id } = req.query;
			if (id && !req.user?.verified) {
				return res.status(401).json({
					status: 401,
					message: 'User is not verified',
				});
			}

			// Get user avatar or default
			const avatar = await Avatar.findById(id || req.user!.id);
			if (!avatar) return res.redirect('/assets/default_avatar.png');

			const { contentType, data } = avatar;
			res.contentType(contentType).send(data);
		},
		{
			doNext: false,
			silent: true,
			failMessage: 'Avatar not found',
			failStatus: 404,
		}
	)
);

const upload = multer();
router.put(
	'/',
	verification(),
	upload.single('avatar'),
	asyncHandler(async (req, res) => {
		// Check if file exists
		const { file } = req;
		if (!file) {
			return res.status(400).json({
				status: 400,
				message: 'Missing "avatar" request property',
			});
		}

		// Check file mimetype
		const { buffer, mimetype } = file;
		if (!mimetype.startsWith('image')) {
			return res.status(400).json({
				status: 400,
				message: '"avatar" file mimetype must be of type "image"',
			});
		}

		// Resize image and get current avatar
		const resized = await sharp(buffer).resize(256, 256).toBuffer();
		const avatar =
			(await req.user!.getAvatar()) || new Avatar({ _id: req.user!._id });

		// Set new values
		avatar.data = resized;
		avatar.contentType = mimetype;
		await avatar.save();

		res.json({
			status: 200,
			message: 'Avatar updated successfully',
		});
	})
);

router.delete(
	'/',
	verification(),
	asyncHandler(async (req, res) => {
		const avatar = await req.user!.getAvatar();
		if (!avatar) {
			return res.status(404).json({
				status: 404,
				message: 'Avatar not found',
			});
		}

		await avatar.deleteOne();
		res.json({
			status: 200,
			message: 'Avatar deleted successfully',
		});
	})
);

export default router;
