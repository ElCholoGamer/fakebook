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
			return done(null, false, { message: 'Email is already registered' });
		}

		// TODO- ADD EMAIL VALIDATION

		if (password.length < 4) {
			return done(null, false, {
				message: 'Password must have a minimum of 4 characters',
			});
		}

		// Generate code
		const code = new Array(6)
			.fill(0)
			.map(() => Math.floor(Math.random() * 10))
			.join('');

		// Create user document
		const user = new User({
			email,
			username,
			password,
			code,
		});

		// Encrypt password and save
		await user.encryptPassword();
		await user.save();

		done(null, user);
	}
);

export default registerStrategy;
