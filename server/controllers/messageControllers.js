import Message from '../models/messageModel.js'
//This is for message endpoints

//This is to get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

//This is to get a single message by id
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    res.json(message);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

//This is to create a new message in the database
export const createMessage = async (req, res) => {
  try {
    const message = new Message({
      user: req.body.user,
      room: req.body.room,
      body: req.body.body,
      when: Date.now(),
    });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

//This is to update a message in the database by id
export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (message) {
      message.user = req.body.user;
      message.room = req.body.room;
      message.body = req.body.body;
      message.when = Date.now();
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

//This is to delete a message from the database by id
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      res.status(404).json({ message: "Message not found" });
      return;
    }
    res.json({ message: "Message deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};





