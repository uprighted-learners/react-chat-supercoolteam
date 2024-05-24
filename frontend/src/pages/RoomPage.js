import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);

  //fetch room details and messages using the room id 
  useEffect(() => {
    const fetchRoomAndMessages = async () => {
      try {
        // Fetch room details
        const getRoom = await fetch(`http://localhost:5500/display/rooms`);
        if (!getRoom.ok) {
          throw new Error('Failed to fetch room details');
        }
        const data = await getRoom.json();
        const roomArray = data.rooms;

        // Find the room based on the ID
        const selectedRoom = roomArray.find(room => room._id === id);
        if (!selectedRoom) {
          throw new Error('Room not found');
        }
        setRoom(selectedRoom);

        // Fetch messages
        const getMessages = await fetch(`http://localhost:5500/room/${id}/messages`);
        if (!getMessages.ok) {
          throw new Error('Failed to fetch messages');
        }
        const messagesData = await getMessages.json();
        setMessages(messagesData.messages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRoomAndMessages();

  }, [id]); // Fetch room and messages whenever the room ID changes

  // Display the room details and messages
  return (
    <div>
      <h2>Room Details</h2>
      <p>Room ID: {id}</p>
      <p>Room Name: {room.name}</p>
      <h3>Messages in this Room:</h3> 
      {messages.filter(message => message._id).map((message) => (
        <div key={message._id}>
          <h4>
          {message.user} Wrote:
          </h4>
          <p>{message.body}</p>
        </div>
      ))}
    </div>
  );
}
