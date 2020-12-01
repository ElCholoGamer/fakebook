import express from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import checkAuth from '../middleware/check-auth';
import validator from '../middleware/validator';
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

// Log in user session
router.post('/login', (req, res) => {
	passport.authenticate('local-login', authCallback(req, res))(req, res);
});

// Register new user
router.post(
	'/register',
	validator({
		username: { type: 'string', minLength: 1 },
		password: { type: 'string', minLength: 1 },
		email: { type: 'string' },
	}),
	(req, res) => {
		passport.authenticate('local-register', authCallback(req, res))(req, res);
	}
);

// Log out user session
router.post('/logout', checkAuth(), (req, res) => {
	req.logout();
	res.json({
		status: 200,
		message: 'Logged out successfully',
	});
});

export default router;
