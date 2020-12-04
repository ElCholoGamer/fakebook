import { Schema, model, Document, Types } from 'mongoose';

interface IPostImage extends Document {
	_id: Types.ObjectId;
	data: Buffer;
	contentType: string;
}

const PostPictureSchema = new Schema({
	data: { type: Buffer, required: true },
	contentType: { type: String, required: true },
});

const PostImage = model<IPostImage>('PostPicture', PostPictureSchema);

export default PostImage;
