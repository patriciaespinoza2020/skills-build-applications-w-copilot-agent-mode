import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    role: { type: String, default: 'member' },
    points: { type: Number, default: 0 }
}, {
    timestamps: true
});
export const User = model('User', userSchema);
