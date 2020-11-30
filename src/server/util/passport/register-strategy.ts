import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user';

const registerStrategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	},
	async (req, email, password, done) => {
		const username = req.body.username.trim();
		email = email.trim();

		const existing = await User.findOne({ email });
		if (existing) {
			return done(null, false, { message: 'User with email already exists' });
		}

		// TODO- ADD EMAIL VALIDATION

		if (password.length < 4) {
			return done(null, false, {
				message: 'Password must have a minimum of 4 characters',
			});
		}

		const user = new User({
			email,
			username,
			password,
		});

		await user.encryptPassword();
		await user.save();

		done(null, user);
	}
);

export default registerStrategy;
