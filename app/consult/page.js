'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';

export default function MentalHealthAssistant() {
    const [conversation, setConversation] = useState([]);
    const [msgs, setMsgs] = useState([]);
    const [userResponse, setUserResponse] = useState('');
    const [sending, setSending] = useState(false);
    const chatContainerRef = useRef(null);
    const [healthData, setHealthData] = useState([]);
    const [journalData, setJournalData] = useState([])
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const healthResponse = await fetch('/api/health');
                const healthResult = await healthResponse.json();
                console.log('Health Data:', healthResult);
                setHealthData(healthResult.healthRecords || []);
                const journalResponse = await fetch('/api/journal?username=' + session);
                const journalResult = await journalResponse.json();
                console.log('Health Data:', journalResult);
                setJournalData(journalResult.journals || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (healthData.length) {
            const prompt = `
                You are analyzing a user's health data, which includes their sleep duration, hydration intake, and food intake over the past 7 days.
                Here is the data:

                Health Data: ${JSON.stringify(healthData)}

                His diary journal for last few days: "${JSON.stringify(journalData)}"

                Your task is to provide a detailed analysis of the user's health data. You need to analyze their sleep patterns, hydration intake, 
                and food consumption in detail.
                
                For sleep analysis, provide insights into the user's sleep duration and patterns, explaining the advantages of maintaining good sleep 
                and the potential disadvantages of not doing so.
                
                For hydration analysis, explain whether the user is consuming an adequate amount of water daily. Provide benefits of proper hydration 
                and the risks of dehydration. Offer suggestions on how they can improve their water intake if necessary.
                
                For food intake, analyze what the user is consuming. Discuss the nutritional value of their food intake, highlighting what is beneficial 
                for them and pointing out areas where they can improve their diet. Offer suggestions on how to include more nutritious foods and cut down 
                on less healthy options.
                
                Make sure to explain each part in detail, highlighting the advantages and disadvantages of the user's current habits, and suggest realistic, 
                actionable improvements that the user can make to their lifestyle to improve their health.

                Address them in 1st person. Keep the response very consise and short, with out headings and bullets, and irrelevant info.
                Put the result in 5-6 sentences only.
            `;
            setConversation((prev) => {
                if (prev.find((convo) => convo.parts[0].text === prompt)) {
                    return prev;
                }
                return [...prev, { role: 'user', parts: [{ text: prompt }] }];
            });
        }
    }, [healthData]);

    useEffect(() => {
        if (conversation.length > 0 && conversation[conversation.length - 1].role === 'user') {
            askQuestion();
        }
    }, [conversation]);

    const askQuestion = () => {
        setSending(true);
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        fetch('/api/agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ conversation })
        })
            .then((response) => response.json())
            .then((data) => {
                setConversation((prevConversation) => [...prevConversation, ...data]);
                setMsgs((prev) => [...prev, { role: data[0]?.role, text: data[0]?.parts[0]?.text }]);
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                setSending(false);
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleUserResponse = (stop) => {
        const response = userResponse.trim();
        if (response) {
            setMsgs((prevConversation) => [...prevConversation, { role: 'user', text: userResponse }]);
            setUserResponse('');
            setConversation((prevConversation) => [...prevConversation, { role: 'user', parts: [{ text: userResponse }] }]);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleUserResponse();
        }
    };

    return (
        <div className="flex flex-col items-center pb-4">
            <div 
                className="flex flex-col rounded-lg p-4 overflow-y-auto mb-4 w-full max-w-lg h-[83vh]"
                ref={chatContainerRef}
                style={{
                    backgroundImage: 'url(https://www.wallpaperuse.com/wallp/100-1005520_m.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: '0.8',
                }}
            >
                {msgs.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg mb-2 max-w-xs ${
                            message.role === 'user' ? 'bg-blue-500 text-white self-end rounded-br-none' : 'bg-gray-100 text-black self-start rounded-bl-none'
                        }`}
                        style={{
                            alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                            borderRadius: message.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                        }}
                    >
                        {message.text}
                    </div>
                ))}
                {sending && <div className="p-2 bg-gray-100 text-black rounded-lg">Agent is typing...</div>}
            </div>
            <div className="flex w-full max-w-lg">
                <input
                    type="text"
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 p-2 border border-gray-200 rounded-l-lg"
                    placeholder="Your response"
                />
                <button onClick={() => handleUserResponse(false)} className="p-2 bg-blue-500 text-white rounded-r-lg" disabled={sending}>
                    Send
                </button>
            </div>
        </div>
    );
}