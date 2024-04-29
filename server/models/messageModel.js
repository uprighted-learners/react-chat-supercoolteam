//This is for our message schema
const mongoose = require("mongoose");


//This is for our message schema 
const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    when: {
        type: Date,
        default: Date.now
    }
})

//exports the model
module.exports = mongoose.model("Message", messageSchema);