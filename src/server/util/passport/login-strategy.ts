import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user';

const loginStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	async (username, password, done) => {
		const user = await User.findOne({ username });
		if (!user) {
			return done(null, false, { message: 'User not found' });
		}

		const match = await user.comparePassword(password);
		if (!match) {
			return done(null, false, { message: 'Invalid password' });
		}

		done(null, user);
	}
);

export default loginStrategy;
