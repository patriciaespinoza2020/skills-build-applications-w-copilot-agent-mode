import mongoose from 'mongoose';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Activity } from '../models/Activity.js';
import { Workout } from '../models/Workout.js';

const mongoUrl = 'mongodb://127.0.0.1:27017/octofit_db';

const teams = [
  { name: 'OctoRunners', description: 'Fast and focused team for daily goals.' },
  { name: 'FitSquad', description: 'Collaborative team for shared fitness wins.' }
];

const users = [
  { name: 'Alicia Gomez', email: 'alicia@example.com', role: 'captain', points: 120 },
  { name: 'Marco Diaz', email: 'marco@example.com', role: 'member', points: 95 },
  { name: 'Nina Patel', email: 'nina@example.com', role: 'member', points: 110 }
];

const activities = [
  { title: 'Morning Run', category: 'cardio', points: 30, durationMinutes: 25 },
  { title: 'Yoga Flow', category: 'flexibility', points: 20, durationMinutes: 40 },
  { title: 'Strength Training', category: 'strength', points: 35, durationMinutes: 50 }
];

const workouts = [
  { durationMinutes: 25, caloriesBurned: 220 },
  { durationMinutes: 40, caloriesBurned: 180 },
  { durationMinutes: 50, caloriesBurned: 360 }
];

async function seed() {
  await mongoose.connect(mongoUrl);
  console.log('Connected to MongoDB for seed:', mongoUrl);

  await Promise.all([
    Team.deleteMany({}),
    User.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const createdTeams = await Team.insertMany(teams);
  const createdActivities = await Activity.insertMany(activities);

  const createdUsers = await Promise.all(
    users.map((user, idx) => {
      const team = createdTeams[idx % createdTeams.length];
      return User.create({ ...user, team: team._id });
    })
  );

  await Promise.all(
    workouts.map((workout, idx) => {
      const user = createdUsers[idx % createdUsers.length];
      const activity = createdActivities[idx % createdActivities.length];
      return Workout.create({
        user: user._id,
        activity: activity._id,
        durationMinutes: workout.durationMinutes,
        caloriesBurned: workout.caloriesBurned,
        date: new Date(Date.now() - idx * 86400000)
      });
    })
  );

  console.log('Seed complete.');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
