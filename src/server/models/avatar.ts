import { Document, model, Schema, Types } from 'mongoose';

export interface IAvatar extends Document {
	_id: Types.ObjectId;
	data: Buffer;
	contentType: string;
}

const AvatarSchema = new Schema({
	data: { type: Buffer, required: true },
	contentType: { type: String, required: true },
});

const Avatar = model<IAvatar>('Avatar', AvatarSchema);

export default Avatar;
