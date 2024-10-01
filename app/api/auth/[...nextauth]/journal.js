// pages/api/journal.js
import dbConnect from '../../utils/dbConnect';
import Journal from '../../models/Journal';

export default async function handler(req, res) {
    await dbConnect(); // Connect to MongoDB

    if (req.method === 'POST') {
        const { journal, date, userId } = req.body;

        try {
            const newJournal = new Journal({
                journal,
                date: date ? new Date(date) : Date.now(),
                userId,
            });

            await newJournal.save();

            res.status(201).json({ message: 'Journal saved successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to save journal' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
