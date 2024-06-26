import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/createMessage.css';

export default function CreateMessage() {
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const loggedInUser = localStorage.getItem('user');

    useEffect(() => {
        fetchMessages();
    }, []);
    //fetch messages function
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5500/messageModels`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };
    //handle submit function for creating a new message
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5500/messageModels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ user: loggedInUser, room, body }), // Update user state
            });
            const data = await response.json();
            setMessages([...messages, data]);
            setRoom('');
            setBody('');
            alert('Message created successfully!');
            // Redirect to home page after successful message creation
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    //handle edit function
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
    
    //handle delete function
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
        <div className="container">
            <h2>Welcome to the create message page</h2>
            <h3>Create a new message</h3>
            {/* Form for creating a new message */}
            {isLoggedIn && (
                <form onSubmit={handleSubmit}>
                    <label>Room</label>
                    <input type='text' value={room} onChange={(e) => setRoom(e.target.value)} required />
                    <label>Body</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} required> </textarea>
                    <button type='submit'>Submit</button>
                </form>
            )}

            {/* Display all messages by user and room id */}
            <h3>All messages</h3>
            {messages.filter(message => message._id).map((message) => (
                <div key={message._id}>
                    <h4>{message.user}</h4>
                    <p>Room: {message.room}</p>
                    <p>{message.body}</p>

                    {isLoggedIn && (
                        <>
                            {message.user === loggedInUser && (
                                /* Edit and delete buttons that call the functions above */
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