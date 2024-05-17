import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateMessage() {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const loggedInUser = localStorage.getItem('user');

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
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ user: localStorage.getItem('user'), room, body }), // Update user state
            });
            const data = await response.json();
            setMessages([...messages, data]);
            setUser('');
            setRoom('');
            setBody('');
            alert('Message created successfully!');
            // Redirect to home page after successful message creation
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };


    const handleEdit = async (id, user, room, currentBody) => {
        const newBody = prompt('Enter the new message body:', currentBody); // Prompt user for new message body
        if (newBody !== null) { // If user cancels, newBody will be null
            if (user === loggedInUser) {
                try {
                    const response = await fetch(`http://localhost:5500/messageModels/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({ user, room, body: newBody }), // Update only the message body
                    });
                    const data = await response.json();
                    console.log('Updated message:', data);
                    setMessages(messages.map((message) => (message._id === id ? data : message)));
                } catch (error) {
                    console.log(error);
                }
            } else {
                alert('You are not authorized to edit this message.');
            }
        }
    };
    
    
    
    

    const handleDelete = async (id, user) => {
        if (user === loggedInUser) {
            try {
                await fetch(`http://localhost:5500/messageModels/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMessages(messages.filter((message) => message._id !== id));
                alert('Message deleted successfully!');
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('You are not authorized to delete this message.');
        }
    };

    return (
        <div>
            <h2>Welcome to the create message page</h2>
            <h3>Create a new message</h3>
            {isLoggedIn && (
                <form onSubmit={handleSubmit}>
                    <label>User</label>
                    <input type='text' value={user} onChange={(e) => setUser(e.target.value)} required />
                    <label>Room</label>
                    <input type='text' value={room} onChange={(e) => setRoom(e.target.value)} required />
                    <label>Body</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} required> </textarea>
                    <button type='submit'>Submit</button>
                </form>
            )}

            <h3>All messages</h3>
            {messages.filter(message => message._id).map((message) => (
                <div key={message._id}>
                    <h4>{message.user}</h4>
                    <p>Room: {message.room}</p>
                    <p>{message.body}</p>

                    {isLoggedIn && (
                        <>
                            {message.user === loggedInUser && (
                                <>
                                    <button onClick={() => handleEdit(message._id, message.user, message.room, message.body)}>Edit</button>
                                    <button onClick={() => handleDelete(message._id, message.user)}>Delete</button>
                                </>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
