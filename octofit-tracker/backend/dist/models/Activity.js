import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    durationMinutes: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});
export const Activity = model('Activity', activitySchema);
