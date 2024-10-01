'use client';

import { useState, useEffect, useRef } from 'react';

export default function MentalHealthAssistant() {
    const [conversation, setConversation] = useState([]);
    const [msgs, setMsgs] = useState([])
    const [userResponse, setUserResponse] = useState('');
    const [sending, setSending] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        fetch('/api/health')
            .then(response => response.json())
            .then(data => {
                const prompt = `
                    Imagine you are an analyzer named "Aashaa" for a user. you need to assess him like a professional therapist 
                    who gives his input in the form of thoughts, dreams, and any other worries he has he will enter. 
                    You also have access to his sleep cycle which will include his sleep time and his wake-up time, 
                    and the food he takes you need to analyze the past 7 data nutritional data from the food he takes and 
                    how it affects his mood, hydration, and any other health information he entered.

                    Health Data: ${JSON.stringify(data)}

                    You need to analyze all this and give him deep insights into his mental and physical health. 
                    You also analyze his surface-level emotions and deep subconscious-level emotions which are stored, 
                    and his thoughts, and dreams, taking this whole holistic approach data you need to give him deep 
                    insights by how his thoughts and you need to analyze and give the user how all this is effecting his mood, 
                    cognitive function, and emotional regulation.
                    
                    Help him navigate through this. Make him feel comfortable and chat with him one by one.
                    Ask him what he need, help him solve his problem. Give him some suggestions or solutions in between. Don't keep on asking questions as he might be irritated.
                    Ignore if he use hurtful language, as he might be to much stressed and not in good mood, as that's the reason why he want to talk to you.
                    Start with your first question as a councellor, which would be directly displayed to the user.
                `;
                setConversation([{ role: 'user', parts: [{ text: prompt }] }]);
                askQuestion({ conversation: [{ role: 'user', parts: [{ text: prompt }] }] });
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        console.log(conversation)
    }, [conversation])

    const askQuestion = (conv) => {
        setSending(true);
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        fetch('/api/agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conv || { conversation })
        })
            .then(response => response.json())
            .then(data => {
                setConversation(prevConversation => [...prevConversation, ...data]);
                setMsgs(prev => [...prev, { role: data[0]?.role, text: data[0]?.parts[0]?.text }]);
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                setSending(false);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleUserResponse = (stop) => {
        const response = userResponse.trim();
        if (response) {
            setMsgs(prevConversation => [...prevConversation, { role: 'user', text: userResponse }]);
            setUserResponse('');
            setConversation(prevConversation => [...prevConversation, { role: 'user', parts: [{ text: userResponse }] }]);
        }
        askQuestion();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleUserResponse();
        }
    };

    return (
        <div className="flex flex-col p-4 items-center">
            <div className="flex flex-col overflow-y-auto mb-4 w-full max-w-lg h-[81vh]" ref={chatContainerRef}>
                {msgs.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg mb-2 max-w-xs ${message.role === 'user' ? 'bg-blue-500 text-white self-end rounded-br-none' : 'bg-gray-300 text-black self-start rounded-bl-none'
                            }`}
                        style={{
                            alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                            borderRadius: message.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                        }}
                    >
                        {message.text}
                    </div>
                ))}
                {sending && <div className="p-2 bg-gray-300 text-black rounded-lg">Consultant is thinking...</div>}
            </div>
            <div className="flex w-full max-w-lg">
                <input
                    type="text"
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 p-2 border rounded-l-lg"
                    placeholder="Your response"
                />
                <button onClick={() => handleUserResponse(false)} className="p-2 bg-blue-500 text-white rounded-r-lg" disabled={sending}>
                    Send
                </button>
            </div>
        </div>
    );
}
