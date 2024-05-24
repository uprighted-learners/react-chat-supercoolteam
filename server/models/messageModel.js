//This is for our message schema
import mongoose from "mongoose";


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
const Message = mongoose.model("Message", messageSchema);
export default Message;