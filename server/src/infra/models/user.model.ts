import mongoose, { Document, Schema } from "mongoose";
import { USER_ROLE } from "../../domain";

export interface IUser extends Document {
    id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    role: USER_ROLE;
    tokenVersion: number;
}

const UserSchema = new Schema({
    id: { type: Schema.Types.ObjectId, require: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['ADMIN','MANAGER','USER'], default: 'USER' },
    tokenVersion: { type: Number, default: 0 },
});

export const UserModel = mongoose.model<IUser>(
    'User',
    UserSchema
)