import { config } from 'dotenv';
import { NextResponse } from 'next/server';

config();

const { API_KEY } = process.env;

export const POST = async (req, res) => {
    try {
        const data = await req.json();
        console.log(data)
        const conversation = data?.conversation || [];

        if (!conversation.length) {
            return new NextResponse({ error: "Error: Empty Conversation." }, { status: 400 });
        }

        const generateContent = async (conversation) => {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
            const headers = { 'Content-Type': 'application/json' };
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify({ contents: conversation })
            });
            const content = await response.json();
            const candidates = content.candidates || [];

            if (candidates.length > 0) {
                const modelResponse = candidates[0].content;
                return [modelResponse];
            }
            return [];
        };
        console.log(conversation)

        const response = await generateContent(conversation);

        if (response.length > 0) {
            return new NextResponse(JSON.stringify(response), { status: 200 });
        } else {
            return new NextResponse({ error: "Error: No response from API." }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return new NextResponse({ error: "Error: " + error.message }, { status: 400 });
    }
};
