import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user';

const registerStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	async (username, password, done) => {
		username = username.trim();

		const existing = await User.findOne({ username });
		if (existing) {
			return done(null, false, { message: 'Username already exists' });
		}

		if (password.length < 4) {
			return done(null, false, {
				message: 'Password must have a minimum of 4 characters',
			});
		}

		const user = new User({
			username,
			password,
		});

		await user.encryptPassword();
		await user.save();

		done(null, user);
	}
);

export default registerStrategy;
