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
    username: { // Store the username of the user who created the journal
        type: String,
        required: true, // Ensure that journal entries are associated with a user
    },
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);
