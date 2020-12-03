import { Schema, model, Document } from 'mongoose';

interface IPostImage extends Document {
	data: Buffer;
	contentType: string;
}

const PostPictureSchema = new Schema({
	data: { type: Buffer, required: true },
	contentType: { type: String, required: true },
});

const PostImage = model<IPostImage>('PostPicture', PostPictureSchema);

export default PostImage;
