declare namespace Express {
	interface Request {
		user?: import('./models/user').IUser;
		post?: import('./models/post').IPost;
	}
}
