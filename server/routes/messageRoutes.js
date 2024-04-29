//This is for message handler functions

const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");
// const auth = require("../middleware/auth"); middleware?


router.get('/messageModels', async (req, res) => {
    try {
        const messages = await Message.find();
        res.send(messages);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/messageModels/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        res.send(message);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/messageModels', async (req, res) => {
    try {
        const message = new Message(req.body);
        const savedMessage = await message.save();
        res.send(savedMessage);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.put('/messageModels/:id', async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, req.body);
        const updatedMessage = await message.save();
        res.send(updatedMessage);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.delete('/messageModels/:id', async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        res.send(message);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router