//This is for our room handler functions

import express from "express";
import { createRoom, displayAllRooms } from "../controllers/roomControllers.js";


const router = express.Router();


// Create room - /create/room
router.post('/create/room', createRoom);


// Display all rooms - /display/rooms
router.get('/display/rooms', displayAllRooms);


export default router;