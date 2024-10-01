// pages/api/journal.js
import Journal from '../../../models/Journal';
import connectMongo from '@/utils/connectMongo';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectMongo(); // Connect to MongoDB

    try {
        // Parse the incoming request to get the journal data
        const body = await req.json();
        const { journal, date } = body;

        // Create a new journal entry
        const newJournal = new Journal({
            journal,
            date: date ? new Date(date) : Date.now(),
        });

        // Save the journal entry to MongoDB
        await newJournal.save();

        // Send a success response
        return NextResponse.json({ message: 'Journal saved successfully!' }, { status: 201 });
    } catch (error) {
        console.error(error);
        // Send an error response
        return NextResponse.json({ error: 'Failed to save journal' }, { status: 500 });
    }
}
