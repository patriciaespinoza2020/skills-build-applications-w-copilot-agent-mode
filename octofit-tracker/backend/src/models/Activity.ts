import { Schema, model } from 'mongoose';

export interface IActivity {
  title: string;
  category: string;
  points: number;
  durationMinutes: number;
}

const activitySchema = new Schema<IActivity>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  points: { type: Number, required: true, default: 0 },
  durationMinutes: { type: Number, required: true, default: 0 }
}, {
  timestamps: true
});

export const Activity = model<IActivity>('Activity', activitySchema);
