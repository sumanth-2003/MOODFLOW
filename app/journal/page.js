'use client';
import 'regenerator-runtime/runtime';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

export default function Journaling() {
    const [journal, setJournal] = useState('');
    const { transcript, resetTranscript, listening } = useSpeechRecognition();

    const handleSubmit = async () => {
        const response = await fetch('/api/journal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ journal: journal || transcript }),
        });
        const result = await response.json();
        console.log(result);
        alert('Dream saved successfully!');
    };

    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const stopListening = () => {
        SpeechRecognition.stopListening();
        setJournal(prev => prev + transcript);
        resetTranscript();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-8 relative bg-gradient-to-b from-pink-50 via-blue-50 to-teal-50">
            {/* Background Image with Opacity */}
            <div className="absolute inset-0">
                <div className="bg-cover bg-center w-full h-full opacity-50" style={{ backgroundImage: "url(https://img.freepik.com/premium-photo/human-avatar-human-inner-world-generative-ai-generative-ai_170984-7115.jpg)" }}></div>
            </div>
            
            <h1 className="text-5xl font-bold text-center mb-4 text-black relative" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Unveil your inner world</h1> {/* Added text shadow */}
            <textarea
                className="border border-gray-300 p-2 w-3/4 max-w-md block rounded-lg text-sm mb-4 relative z-10 bg-gradient-to-b from-pink-50 via-blue-50 to-teal-50"
                value={journal + transcript}
                onChange={(e) => setJournal(e.target.value)}
                placeholder="Type here to discover your true self..."
                rows={5}
                style={{ 
                    padding: '3rem 3rem 5rem',
                    fontSize: '20px',
                    color: '#333',
                    height: 'auto',
                    lineHeight: '2.5',
                    width: '90%',
                    maxWidth: '600px',
                }}
            />
            <div className='my-3 relative z-10'>
                {listening ? (
                    <button
                        onClick={stopListening}
                        className="px-6 py-3 rounded-lg bg-red-500 text-white me-3 text-lg border border-red-300"
                    >
                        <FontAwesomeIcon icon={faMicrophoneSlash} />
                    </button>
                ) : (
                    <button
                        onClick={startListening}
                        className="px-6 py-3 rounded-lg bg-green-500 text-white me-3 text-lg border border-green-300"
                    >
                        <FontAwesomeIcon icon={faMicrophone} />
                    </button>
                )}
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white p-3 rounded-lg text-lg border border-blue-300"
                >
                    Save
                </button>
            </div>
        </div>
    );
}