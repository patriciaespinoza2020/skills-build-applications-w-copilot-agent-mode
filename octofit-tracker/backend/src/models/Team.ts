import { Schema, model } from 'mongoose';

export interface ITeam {
  name: string;
  description: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' }
}, {
  timestamps: true
});

export const Team = model<ITeam>('Team', teamSchema);
