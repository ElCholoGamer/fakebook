import './util/config';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import http from 'http';
import initPassport from './util/passport';
import mainRouter from './routes/main';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import initSocket from './util/websocket';

// Initialization
const app = express();
const server = http.createServer(app);
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

initSocket(server);

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
		server.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
	})
	.catch(console.error);
