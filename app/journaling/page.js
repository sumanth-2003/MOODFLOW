'use client';
import 'regenerator-runtime/runtime';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import the useSpeechRecognition hook directly
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Journaling() {
    const [dream, setDream] = useState('');
    const { transcript, resetTranscript } = useSpeechRecognition();  // Access useSpeechRecognition directly

    const handleSubmit = async () => {
        const response = await fetch('/api/dream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dream: dream || transcript }),
        });
        const result = await response.json();
        console.log(result);
        alert('Dream saved successfully!');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-4">Record Your Dream</h1>
            <textarea
                className="border p-2 w-full"
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="Type your dream here..."
                rows={5}
            />
            <div className="mt-4">
                <button
                    className="mr-4 p-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => SpeechRecognition.startListening()}
                >
                    Speak Your Dream
                </button>
                <button
                    className="p-2 bg-green-500 text-white rounded-lg"
                    onClick={handleSubmit}
                >
                    Submit Dream
                </button>
            </div>
        </div>
    );
}
