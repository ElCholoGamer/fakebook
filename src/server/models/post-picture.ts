import { Schema, model, Document } from 'mongoose';

interface IPostPicture extends Document {
	data: Buffer;
	contentType: string;
}

const PostPictureSchema = new Schema({
	data: { type: Buffer, required: true },
	contentType: { type: String, required: true },
});

const PostPicture = model<IPostPicture>('PostPicture', PostPictureSchema);

export default PostPicture;
