import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import checkAuth from '../../middleware/check-auth';
import verification from '../../middleware/verification';
import Avatar from '../../models/avatar';
import asyncHandler from '../../util/async-handler';
import { readFileSync } from 'fs';

const router = express.Router();

const DEFAULT_AVATAR = readFileSync('./assets/default_avatar.png');

// Get user avatar
router.get(
	'/',
	checkAuth(),
	asyncHandler(async (req, res) => {
		// Get user avatar or default
		const avatar = await req.user!.getAvatar();

		// Send image response
		const { contentType, data } = avatar || {
			contentType: 'image/png',
			data: DEFAULT_AVATAR,
		};
		res.contentType(contentType).send(data);
	})
);

// Get another user's avatar
router.get(
	'/:id',
	asyncHandler(
		async (req, res) => {
			// Get user avatar or default
			const avatar = await Avatar.findById(req.params.id);

			// Send image response
			const { contentType, data } = avatar || {
				contentType: 'image/png',
				data: DEFAULT_AVATAR,
			};
			res.contentType(contentType).send(data);
		},
		{
			silent: true,
		}
	)
);

// Update avatar
const upload = multer();
router.put(
	'/',
	checkAuth(),
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

		if (!req.user!.avatar) {
			req.user!.avatar = true;
			await req.user!.save();
		}

		res.json({
			status: 200,
			message: 'Avatar updated successfully',
		});
	})
);

// Remove user avatar
router.delete(
	'/',
	checkAuth(),
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
		req.user!.avatar = false;
		await req.user!.save();

		res.json({
			status: 200,
			message: 'Avatar deleted successfully',
		});
	})
);

export default router;
