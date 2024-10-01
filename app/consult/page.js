'use client';

import { useState } from 'react';

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            // Simulate consultant response
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'Consultant response', sender: 'consultant' },
                ]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col p-4 items-center">
            <div className="flex flex-col overflow-y-auto mb-4 w-full max-w-lg h-[81vh]">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg mb-2 max-w-xs ${
                            message.sender === 'user' ? 'bg-blue-500 text-white self-end rounded-br-none' : 'bg-gray-300 text-black self-start rounded-bl-none'
                        }`}
                        style={{
                            alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            borderRadius: message.sender === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                        }}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="flex w-full max-w-lg">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 border rounded-l-lg"
                />
                <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r-lg">
                    Send
                </button>
            </div>
        </div>
    );
}