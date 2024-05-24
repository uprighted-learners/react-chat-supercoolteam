//This is for our room handler functions

import express from "express";
import { createRoom, displayAllRooms, getMessagesByRoomId } from "../controllers/roomControllers.js";


const router = express.Router();


// Create room - /create/room
router.post('/create/room', createRoom);


// Display all rooms - /display/rooms
router.get('/display/rooms', displayAllRooms);


// Get messages by room ID - /room/:id/messages
router.get('/room/:id/messages', getMessagesByRoomId);


export default router;