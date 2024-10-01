// models/Journal.js
import mongoose from 'mongoose';

const JournalSchema = new mongoose.Schema({
    journal: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Store the current date if not provided
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', // Assuming user authentication exists
    //     required: true,
    // },
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
