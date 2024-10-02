'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function ScheduleMeet() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const startTime = new Date(new Date().getTime() + 15 * 60000).toISOString();
    const endTime = new Date(new Date().getTime() + 45 * 60000).toISOString();

    const handleSchedule = async () => {
        setLoading(true);
        setResponseMessage('');

        const res = await fetch('/api/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.user?.accessToken}`,
            },
            body: JSON.stringify({
                summary: 'Session with Psychiatrist',
                description: 'Mental health consultation',
                startTime,
                endTime,
                timeZone: 'Asia/Kolkata',
                inviteeEmail: 'knagasamanvitha@gmail.com'
            }),
        });

        const data = await res.json();
        setLoading(false);
        if (res.ok) {
            setResponseMessage(<>Meet scheduled successfully! <a style={{ textDecoration: 'underline' }} href="${data.meetLink}">Meet Link Here</a></>);
        } else {
            setResponseMessage(data.error || 'Error scheduling meet');
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Please log in to schedule a meeting</h1>
                    <button
                        onClick={() => signIn('google')}
                        className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 mx-auto px-4 border border-blue-500 hover:border-transparent rounded transition duration-200 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M24 9.5c3.1 0 5.6 1.1 7.5 2.9l5.6-5.6C33.4 3.5 28.9 1.5 24 1.5 14.8 1.5 7.2 7.8 4.7 16.1l6.9 5.4C13.2 14.3 18.1 9.5 24 9.5z" />
                            <path fill="#34A853" d="M46.5 24c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.4 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.6z" />
                            <path fill="#FBBC05" d="M10.2 28.5c-1.1-3-1.1-6.3 0-9.3l-6.9-5.4C.5 18.1 0 21 0 24s.5 5.9 1.4 8.6l6.8-5.4z" />
                            <path fill="#EA4335" d="M24 46.5c5.9 0 10.8-2 14.4-5.4l-7.6-5.9c-2.1 1.4-4.7 2.2-7.4 2.2-5.9 0-10.8-4.8-11.9-10.9l-6.9 5.4C7.2 40.2 14.8 46.5 24 46.5z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                        Login with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-[95vh] bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/005/661/870/large_2x/psychologist-and-female-patient-in-psychotherapy-session-free-vector.jpg"
                    alt="Psychotherapy Session"
                    className="w-full h-auto mb-4 rounded"
                />
                <h1 className="text-2xl font-bold mb-4 text-center">Schedule a Session with Psychiatrist</h1>
                <p className="text-center mb-4">Logged in as <span className="font-semibold">{session.user.email}</span></p>
                <div className="mb-4">
                    <label className="block text-gray-700">Invite Email:</label>
                    <input type="email" value="knagasamanvitha@gmail.com" name='inviteeEmail' disabled className="border py-2 px-3 mt-1 w-full rounded-md bg-gray-100" />
                </div>
                <button
                    onClick={handleSchedule}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4 hover:bg-blue-600 transition duration-200"
                    disabled={loading}
                >
                    {loading ? 'Scheduling...' : 'Schedule Meet'}
                </button>
                {responseMessage && <p className="mt-4 text-center text-green-500">{responseMessage}</p>}
            </div>
        </div>
    );
}
