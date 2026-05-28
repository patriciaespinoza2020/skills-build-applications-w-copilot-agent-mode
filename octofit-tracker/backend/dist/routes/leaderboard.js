import { Router } from 'express';
import { User } from '../models/User';
import { Team } from '../models/Team';
const router = Router();
router.get('/', async (req, res) => {
    const topUsers = await User.find().sort({ points: -1 }).limit(10).populate('team');
    const teams = await Team.aggregate([
        { $lookup: { from: 'users', localField: '_id', foreignField: 'team', as: 'members' } },
        { $addFields: { totalPoints: { $sum: '$members.points' }, memberCount: { $size: '$members' } } },
        { $sort: { totalPoints: -1 } },
        { $limit: 10 }
    ]);
    res.json({ topUsers, topTeams: teams });
});
export default router;
