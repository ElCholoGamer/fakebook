import { Schema, model, Document, Types } from 'mongoose';

interface IAuthor {
	_id: Types.ObjectId;
	username: string;
}

const AuthorSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	username: { type: String, required: true },
});

interface IComment {
	author: IAuthor;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

const CommentSchema = new Schema(
	{
		author: { type: AuthorSchema, required: true },
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

interface IPost extends Document {
	title: string;
	author: IAuthor;
	content?: string;
	image: boolean;
	likes: number;
	comments: IComment[];
	createdAt: Date;
	updatedAt: Date;
}

const PostSchema = new Schema(
	{
		title: { type: String, required: true, trim: true, minlength: 1 },
		author: { type: AuthorSchema, required: true },
		content: { type: String, trim: true },
		image: { type: Boolean, required: true, default: false },
		likes: { type: Number, required: true, default: 0 },
		comments: { type: [CommentSchema], required: true, default: [] },
	},
	{ timestamps: true }
);

const Post = model<IPost>('Post', PostSchema);

export default Post;
