import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user';
import sendCode from '../mailer';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const registerStrategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	},
	async (req, email, password, done) => {
		const username: string = req.body.username.trim();
		email = email.toLowerCase().trim();

		// Check if user with email already exists
		const existing = await User.findOne({ email });
		if (existing) {
			return done(null, false, { message: 'Email is already registered' });
		}

		// Validate username
		if (username.length > 15) {
			return done(null, false, { message: 'Username is too long' });
		}

		// Validate password
		if (password.length < 4) {
			return done(null, false, {
				message: 'Password must have a minimum of 4 characters',
			});
		}

		// Validate email
		if (!EMAIL_REGEX.test(email)) {
			return done(null, false, { message: 'The provided email is invalid' });
		}

		// Generate verification code
		const code = Math.random().toString(16).substr(3);

		// Create user document
		const user = new User({
			email,
			username,
			password,
			code,
		});

		sendCode(email, code); // Send verification code to email

		// Encrypt password and save
		await user.encryptPassword();
		await user.save();

		done(null, user);
	}
);

export default registerStrategy;
