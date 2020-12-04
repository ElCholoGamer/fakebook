import { compare, hash } from 'bcrypt';
import { Document, model, Schema, Types } from 'mongoose';
import Avatar, { IAvatar } from './avatar';

export interface IUser extends Document {
	_id: Types.ObjectId;
	username: string;
	password: string;
	email: string;
	bio?: string;
	avatar: boolean;
	verified: boolean;
	code?: string;
	comparePassword(password: string): Promise<boolean>;
	encryptPassword(salt?: number): Promise<void>;
	getAvatar(): Promise<IAvatar | null>;
}

const UserSchema = new Schema({
	username: { type: String, required: true, trim: true, minlength: 1 },
	password: { type: String, required: true, minlength: 4 },
	email: { type: String, required: true, trim: true },
	bio: String,
	avatar: { type: Boolean, required: true, default: false },
	verified: { type: Boolean, required: true, default: false },
	code: String,
});

UserSchema.methods.getAvatar = async function () {
	return await Avatar.findById(this._id);
};

UserSchema.methods.comparePassword = function (password: string) {
	return compare(password, this.password);
};

UserSchema.methods.encryptPassword = async function (salt = 10) {
	this.password = await hash(this.password, salt);
};

const User = model<IUser>('User', UserSchema);

export default User;
