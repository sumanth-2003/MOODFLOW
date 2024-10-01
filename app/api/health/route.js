import connectMongo from '@/utils/connectMongo';
import Health from '@/models/Health';
import { NextResponse } from 'next/server';

export async function POST(req) {
    await connectMongo();

    try {
        const { sleepTime, wakeTime, foodIntake, waterIntake, additionalHealthData, username } = await req.json();

        const newHealthRecord = new Health({
            sleepTime,
            wakeTime,
            foodIntake,
            waterIntake,
            additionalHealthData,
            username
        });

        await newHealthRecord.save();

        return NextResponse.json({ message: 'Health record created successfully', healthRecord: newHealthRecord }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    await connectMongo();

    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentHealthRecords = await Health.find({
            createdAt: { $gte: sevenDaysAgo }
        });

        return NextResponse.json({ healthRecords: recentHealthRecords }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}