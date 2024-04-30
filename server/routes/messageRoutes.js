//This is for message handler functions
import express from 'express'
import authenticateToken from "../middleware/auth.js";
import { getMessages, getMessageById, createMessage, updateMessage, deleteMessage } from '../controllers/messageControllers.js';

const messageControllers = { getMessages, getMessageById, createMessage, updateMessage, deleteMessage }
const router = express.Router();



// gets a route for all messages
router.get('/messageModels', messageControllers.getMessages)

// gets a route for a single message
router.get('/messageModels/:id', messageControllers.getMessageById)

// gets a route for creating a new message
router.post('/messageModels', authenticateToken, messageControllers.createMessage)

// gets a route for editing a message
router.put('/messageModels/:id', authenticateToken,  messageControllers.updateMessage)

// gets a route for deleting a message
router.delete('/messageModels/:id', authenticateToken, messageControllers.deleteMessage)

export default router
