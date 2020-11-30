import express from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { IUser } from '../models/user';

const router = express.Router();

const authCallback = (req: express.Request, res: express.Response) => (
	err: any,
	user: IUser,
	info: IVerifyOptions | undefined
) => {
	if (err) {
		console.error(err);
		return res.status(500).json({ status: 500, error: err });
	}

	if (!user) {
		return res.status(401).json({
			status: 401,
			message: info?.message || '[no message provided]',
		});
	}

	req.login(user, err => {
		if (err) {
			console.error(err);
			res.status(500).json({ status: 500, error: err });
		} else {
			res.json({ status: 200, user });
		}
	});
};

router.post('/login', (req, res) => {
	passport.authenticate('local-login', authCallback(req, res))(req, res);
});

router.post('/register', (req, res) => {
	passport.authenticate('local-register', authCallback(req, res))(req, res);
});

export default router;
