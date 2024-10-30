// client/src/App.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Server URL

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receive_message'); // Cleanup listener on unmount
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('send_message', { message });
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Chat App</h1>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.message}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
