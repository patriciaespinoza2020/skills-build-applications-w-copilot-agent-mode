import { Schema, model, Types } from 'mongoose';

export interface IWorkout {
  user: Types.ObjectId;
  activity: Types.ObjectId;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const workoutSchema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activity: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
  durationMinutes: { type: Number, required: true, default: 30 },
  caloriesBurned: { type: Number, required: true, default: 0 },
  date: { type: Date, required: true, default: () => new Date() }
}, {
  timestamps: true
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
