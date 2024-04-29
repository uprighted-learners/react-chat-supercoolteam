//This is for message handler functions

const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");
const auth = require("../middleware/auth"); 

// gets a route for all messages
router.get('/messageModels', messageControllers.getMessages)

// gets a route for a single message
router.get('/messageModels/:id', messageControllers.getMessageById)

// gets a route for creating a new message
router.post('/messageModels', auth, messageControllers.createMessage)

// gets a route for editing a message
router.put('/messageModels/:id', auth,  messageControllers.updateMessage)

// gets a route for deleting a message
router.delete('/messageModels/:id', auth, messageControllers.deleteMessage)

module.exports = router