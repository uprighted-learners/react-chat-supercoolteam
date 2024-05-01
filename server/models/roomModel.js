//This is for room Schema

import mongoose from 'mongoose'


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    addedUsers: {
        type: String,
        required: true,
    }
});




// Create the model for a room
const Room = mongoose.model('Room', roomSchema);
//export it to be used
export default Room;