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
        alert('Journal saved successfully!');
        setJournal('');
    };

    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const stopListening = () => {
        SpeechRecognition.stopListening()
        setJournal(prev => prev + transcript)
        resetTranscript()
    };

    return (
        <div className="container mx-auto p-4" style={{ minHeight: '94vh' }}>
            <h1 className="text-4xl font-bold text-center mb-4">Record Your Journal</h1>
            <textarea
                className="border p-2 w-full block w-full border-gray-200 rounded-lg text-sm"
                value={journal + transcript}
                onChange={(e) => setJournal(e.target.value)}
                placeholder="Type your journla here..."
                rows={5}
            />
            <div className='my-3'>
                {listening ? (
                    <button
                        onClick={stopListening}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white me-3"
                    >
                        <FontAwesomeIcon icon={faMicrophoneSlash} />
                    </button>
                ) : (
                    <button
                        onClick={startListening}
                        className="px-4 py-2 rounded-lg bg-green-500 text-white me-3"
                    >
                        <FontAwesomeIcon icon={faMicrophone} />
                    </button>
                )}
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                >
                    Save Journal
                </button>
            </div>
        </div>
    );
}