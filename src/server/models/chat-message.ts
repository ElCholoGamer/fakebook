import { Schema, model, Document } from 'mongoose';
import { AuthorSchema, IAuthor } from './post';

interface IChatMessage extends Document {
	author: IAuthor;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

const ChatMessageSchema = new Schema(
	{
		author: { type: AuthorSchema, required: true },
		content: { type: String, required: true, minlength: 1 },
	},
	{ timestamps: true }
);

const ChatMessage = model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatMessage;
