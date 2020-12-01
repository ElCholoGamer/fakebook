import express from 'express';
import { resolve, join } from 'path';

const router = express.Router();

const BUILD = resolve(__dirname, '../../build');
router.use(express.static(BUILD));

router.get('*', (req, res, next) => {
	const {
		method,
		headers: { accept = '' },
	} = req;

	if (method === 'GET' && accept.indexOf('text/html') !== -1) {
		res.sendFile(join(BUILD, 'index.html'));
	} else {
		next();
	}
});

export default router;
