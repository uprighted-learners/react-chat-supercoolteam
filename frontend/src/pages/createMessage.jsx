import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateMessage() {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5500/messageModels`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5500/messageModels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, room, body }),
            });
            const data = await response.json();
            setMessages([...messages, data]);
            setUser('');
            setRoom('');
            setBody('');
            // Redirect to home page after successful message creation
            navigate('/'); // Use navigate to go to the home page
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Welcome to the create message page</h2>
            <h3>Create a new message</h3>
            <form onSubmit={handleSubmit}>
                <label>User</label>
                <input type='text' value={user} onChange={(e) => setUser(e.target.value)} required />
                <label>Room</label>
                <input type='text' value={room} onChange={(e) => setRoom(e.target.value)} required />
                <label>Body</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} required> </textarea>
                <button type='submit'>Submit</button>
            </form>

            <h3>All messages</h3>
            {messages.filter(message => message._id).map((message) => (
                <div key={message._id}>
                    <h4>{message.user}</h4>
                    <p>Room: {message.room}</p>
                    <p>{message.body}</p>
                </div>
            ))}
        </div>
    );
}
