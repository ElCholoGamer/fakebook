import { compare, hash } from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	username: string;
	password: string;
	bio?: string;
	verified: boolean;
	code?: string;
	comparePassword(password: string): Promise<boolean>;
	encryptPassword(salt?: number): Promise<void>;
}

const UserSchema = new Schema({
	username: { type: String, required: true, trim: true, minlength: 1 },
	password: { type: String, required: true, minlength: 4 },
	bio: String,
	verified: { type: Boolean, required: true, default: false },
	code: String,
});

UserSchema.methods.comparePassword = function (password: string) {
	return compare(password, this.password);
};

UserSchema.methods.encryptPassword = async function (salt = 10) {
	this.password = await hash(this.password, salt);
};

const User = model<IUser>('User', UserSchema);

export default User;
