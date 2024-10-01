import connectMongo from '@/utils/connectMongo';
import Journal from '@/models/Journal';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectMongo(); // Ensure MongoDB connection

    try {
        // Get journal and username from request body
        const { journal, username } = await req.json();

        console.log('Received journal:', journal);
        console.log('Received username:', username);

        // Validate that the journal and username exist
        if (!journal || !username) {
            console.log('Missing journal or username');
            return NextResponse.json({ error: 'Journal or username missing' }, { status: 400 });
        }

        // Create a new journal entry
        const newJournal = new Journal({
            journal,
            username,
            date: new Date(),
        });

        await newJournal.save();
        console.log('Journal saved successfully');

        return NextResponse.json({ message: 'Journal saved successfully!' }, { status: 201 });
    } catch (error) {
        console.error('Error saving journal:', error);
        return NextResponse.json({ error: 'Failed to save journal' }, { status: 500 });
    }
}

// GET route to retrieve journals for a user from the URL params
export async function GET(req) {
    await connectMongo();

    try {
        // Extract the username from the URL query parameters
        const { searchParams } = new URL(req.url);
        const username = searchParams.get('username'); // Extract username from URL params

        // Ensure the username exists in the query params
        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        // Fetch the journals for the user in the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const journals = await Journal.find({
            username, // Retrieve journals based on the username from the query
            date: { $gte: sevenDaysAgo },
        }).sort({ date: -1 });

        return NextResponse.json({ journals }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving journals:', error);
        return NextResponse.json({ error: 'Failed to retrieve journals' }, { status: 500 });
    }
}
