import { Schema, model, Document, Types } from 'mongoose';

export interface IAuthor {
	_id: Types.ObjectId;
	username: string;
}

export const AuthorSchema = new Schema({
	_id: { type: Types.ObjectId, required: true },
	username: { type: String, required: true },
});

interface IComment {
	author: IAuthor;
	content: string;
}

const CommentSchema = new Schema(
	{
		author: { type: AuthorSchema, required: true },
		content: { type: String, required: true },
	},
	{ timestamps: true }
);

export interface IPost extends Document {
	title: string;
	author: IAuthor;
	content?: string;
	image: boolean;
	likes: Types.ObjectId[];
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
		likes: { type: [Types.ObjectId], required: true },
		comments: { type: [CommentSchema], required: true },
	},
	{ timestamps: true }
);

const Post = model<IPost>('Post', PostSchema);

export default Post;
