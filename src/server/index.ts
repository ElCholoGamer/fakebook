import connectMongo from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import mainRouter from './routes/main';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import initPassport from './util/passport';

dotenv.config();

// Initialization
const app = express();
const MongoStore = connectMongo(session);
initPassport();

// Options
app.enabled('trust proxy');
app.set('json replacer', (key: string, val: any) =>
	['password', 'code'].includes(key) ? undefined : val
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('common'));

// Session middleware
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'big-chungus',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Either static files or main router
app.use(process.env.TS_NODE_DEV ? express.static('public') : mainRouter);

// Routes
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// Connect to database
console.log('Connecting to database...');
mongoose
	.connect(process.env.ATLAS_URI || '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Database connected!');

		// Listening
		const { PORT = 5000 } = process.env;
		app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
	})
	.catch(console.error);
