import mongoose, { Schema, Model, Document } from 'mongoose';
import { IUserDocument } from '@/types';

export interface IUserModel extends Omit<IUserDocument, '_id'>, Document {}

const UserSchema = new Schema<IUserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ['CUSTOMER', 'ADMIN'], default: 'CUSTOMER' },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation model error in HMR
const User: Model<IUserModel> =
  mongoose.models.User || mongoose.model<IUserModel>('User', UserSchema);

export default User;
