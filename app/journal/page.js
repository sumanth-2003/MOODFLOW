'use client';
import 'regenerator-runtime/runtime';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

export default function Journaling() {
    const [journal, setJournal] = useState('');
    const [journals, setJournals] = useState([]); 
    const [selectedJournal, setSelectedJournal] = useState(null); 
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchJournals = async () => {
            if (!session) return;

            const response = await fetch('/api/journal?username=' + session.user.username);
            const data = await response.json();
            setJournals(data.journals || []);
        };

        fetchJournals();
    }, [session]); 

    const handleSubmit = async () => {
        if (!session) {
            alert('You need to be logged in to submit a journal.');
            return;
        }

        const username = session.user.username || session.user.email;

        console.log('Submitting journal:', journal);
        console.log('Submitting username:', username);

        try {
            const response = await fetch('/api/journal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ journal, username }),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Journal saved successfully!');
            } else {
                console.error('Failed to save journal:', result.error);
                alert('Failed to save journal');
            }

            setJournal('');
            const fetchJournals = async () => {
                const response = await fetch('/api/journal');
                const data = await response.json();
                setJournals(data.journals || []);
            };
            fetchJournals();
        } catch (error) {
            console.error('Error submitting journal:', error);
            alert('An error occurred while saving the journal');
        }
    };


    const startListening = () => SpeechRecognition.startListening({ continuous: true });

    const stopListening = () => {
        SpeechRecognition.stopListening();
        setJournal(prev => prev + transcript);
        resetTranscript();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-8 relative bg-gradient-to-b from-pink-50 via-blue-50 to-teal-50">
            <div className="absolute inset-0">
                <div className="bg-cover bg-center w-full h-full opacity-50" style={{ backgroundImage: "url(https://img.freepik.com/premium-photo/human-avatar-human-inner-world-generative-ai-generative-ai_170984-7115.jpg)" }}></div>
            </div>

            <h1 className="text-5xl font-bold text-center mb-4 text-black relative" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Unveil your Inner World</h1>

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
                        className="px-6 py-3 rounded-lg bg-green-500 text-white me-3 text-lg border border-red-300"
                    >
                        <FontAwesomeIcon icon={faMicrophone} />
                    </button>
                ) : (
                    <button
                        onClick={startListening}
                        className="px-6 py-3 rounded-lg bg-red-500 text-white me-3 text-lg border border-green-300"
                    >
                        <FontAwesomeIcon icon={faMicrophoneSlash} />
                    </button>
                )}
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white p-3 rounded-lg text-lg border border-blue-300"
                >
                    Save
                </button>
            </div>

            <div className="w-3/4 max-w-md mt-8 relative z-10">
                <h2 className="text-3xl font-bold mb-4">Your last 7 days of journals:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {journals.map(j => (
                        <div
                            key={j._id}
                            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                            onClick={() => setSelectedJournal(j)}
                        >
                            <h3 className="text-xl font-bold mb-2">
                                {new Date(j.date).toLocaleDateString()}
                            </h3>
                            <p className="text-gray-600 truncate">
                                {j.journal.substring(0, 50)}...
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedJournal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                        <h3 className="text-2xl font-bold mb-2">Journal from {new Date(selectedJournal.date).toLocaleDateString()}</h3>
                        <p>{selectedJournal.journal}</p>
                        <button
                            className="mt-4 bg-red-500 text-white p-2 rounded-lg"
                            onClick={() => setSelectedJournal(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}