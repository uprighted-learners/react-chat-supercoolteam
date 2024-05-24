import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  //fetch all rooms
  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:5500/display/rooms');
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      const data = await response.json();

      const roomArray = data.rooms || [];// empty array if data.rooms is undefined to keep from throwing unrealted errors
      setRooms(roomArray);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  //display all rooms available
  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            <button onClick={() => {
              navigate(`/room/${room._id}`);
            }}>
              {room.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}