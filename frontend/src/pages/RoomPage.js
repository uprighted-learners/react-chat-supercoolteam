import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RoomPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  //fetch messages in a room using the room id 
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5500/room/${id}/messages`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    }, [id]); // Fetch messages whenever the room ID changes

  return (
    <div>
      <h2>Room Details</h2>
      <p>Room ID: {id}</p>
      <h3>Messages in this Room:</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.body}</li>
        ))}
      </ul>
    </div>
  );
}
