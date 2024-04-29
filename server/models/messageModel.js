//This is for our message schema
const mongoose = require("mongoose");



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


module.exports = mongoose.model("Message", messageSchema);