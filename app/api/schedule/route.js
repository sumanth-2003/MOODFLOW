import { getServerSession } from "next-auth";
import { google } from "googleapis";
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request) {
    // Retrieve session to get the Google access token
    const session = await getServerSession(authOptions);
    
    if (!session || !session.googleAccessToken) {
        return new Response(JSON.stringify({ error: "Unauthorized: Google Calendar access required" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.googleAccessToken });

    const calendar = google.calendar({ version: 'v3', auth });

    const body = await request.json();

    const inviteeEmail = body.inviteeEmail;
    const event = {
        summary: body.summary || 'Google Meet Event',
        description: body.description || 'Scheduled via Google Calendar API',
        start: {
            dateTime: body.startTime,
            timeZone: body.timeZone || 'America/Los_Angeles'
        },
        end: {
            dateTime: body.endTime,
            timeZone: body.timeZone || 'America/Los_Angeles'
        },
        attendees: [
            { email: inviteeEmail }
        ],
        conferenceData: {
            createRequest: {
                requestId: "meet-" + new Date().getTime(),
                conferenceSolutionKey: {
                    type: "hangoutsMeet"
                }
            }
        },
    };

    try {
        const res = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1,
            sendUpdates: 'all'
        });

        return new Response(JSON.stringify({ 
            meetLink: res.data.hangoutLink, 
            inviteeEmail 
        }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating Google Meet:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
