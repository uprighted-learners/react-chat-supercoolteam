import React, {useEffect, useState} from 'react'

export default function createMessage() {
    const [messages, setMessages] = useState([]);
    const [title , setTitle] = useState('');
    const [author , setAuthor] = useState('');
    const [content , setContent] = useState('');

    useEffect (() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:6000/api/messages')
            const data = await response.json()
            setMessages(data)
        } catch (error) {
            console.log(error)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:6000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, content }),
            });
            const data = await response.json();
            setMessages([...messages, data]);
            setTitle('');
            setAuthor('');
            setContent('');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <h2>Welcome to the create message page</h2>
        <h3>Create a new message</h3>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Author</label>
            <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <label>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required> </textarea>
            <button type='submit'>Submit</button>
        </form>

        <h3>All messages</h3>
        {messages.map((message) => (
            <div key={message.id}>
                <h4>{message.title}</h4>
                <p>Author: {message.author}</p>
                <p>{message.content}</p>
            </div>
        ))}
    </div>
  )
}

