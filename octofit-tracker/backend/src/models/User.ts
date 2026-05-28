import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  team: Types.ObjectId;
  role: string;
  points: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  role: { type: String, default: 'member' },
  points: { type: Number, default: 0 }
}, {
  timestamps: true
});

export const User = model<IUser>('User', userSchema);
