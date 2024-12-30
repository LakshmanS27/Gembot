import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const greetingMessage = { text: 'Hello, I am Gembot. How can I assist you today?', sender: 'bot' };
        setMessages([greetingMessage]);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading || !input.trim()) return;

        const newMessage = { text: input.trim(), sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gemini-pro',
                    contents: [{ type: 'text', text: input }],
                }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let text = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                text += decoder.decode(value);
            }

            // Check if the response is empty or contains inappropriate content
            if (!text.trim() || containsInappropriateContent(input)) {
                // Fallback message
                text = "I am sorry, as an ethical AI bot I cannot answer to these types of questions.";
            }

            const botMessage = { text: text.trim(), sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching chatbot response:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Sorry, there was an error with the bot.', sender: 'bot' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to detect inappropriate content
    const containsInappropriateContent = (input) => {
        // Define a list of forbidden words or phrases
        const forbiddenPhrases = [
            'violence', 'abuse', 'hate', 'unethical', 'harmful', 'illegal',
            'racism', 'discrimination', 'offensive', // add more as needed
        ];

        return forbiddenPhrases.some((phrase) => input.toLowerCase().includes(phrase));
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    placeholder="Get Answered here"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={(e) => (e.target.placeholder = '')}
                    onBlur={(e) => (e.target.placeholder = 'Get Answered here')}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? '...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
