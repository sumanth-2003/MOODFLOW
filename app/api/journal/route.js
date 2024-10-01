import connectMongo from '@/utils/connectMongo';
import Journal from '@/models/Journal';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

// POST route to save a journal entry along with the username
export async function POST(req) {
    await connectMongo();

    try {
        const session = await getSession({ req }); // Get the logged-in user session
        if (!session) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { journal } = await req.json();

        // Create a new journal entry with the username
        const newJournal = new Journal({
            journal,
            date: new Date(),
            username: session.user.name, // Save the journal with the username from the session
        });

        await newJournal.save();

        return NextResponse.json({ message: 'Journal saved successfully!' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save journal' }, { status: 500 });
    }
}

// GET route to retrieve journals for the logged-in user
export async function GET(req) {
    await connectMongo();

    try {
        const session = await getSession({ req }); // Get the logged-in user session
        if (!session) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Fetch the journals for the logged-in user (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const journals = await Journal.find({
            username: session.user.name, // Retrieve only the journals for the logged-in user
            date: { $gte: sevenDaysAgo },
        }).sort({ date: -1 });

        return NextResponse.json({ journals }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to retrieve journals' }, { status: 500 });
    }
}
