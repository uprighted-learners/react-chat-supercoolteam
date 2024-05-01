import User from '../models/userModel.js';
import Room from '../models/roomModel.js';

export const createRoom = async (req, res) => {
    try {
        const { name, description, email } = req.body;

        // Check if all user emails in emails are found in the database
        if (!email) {
            return res.status(400).json({ message: 'One or more users not found', email });
        }

        // Create the room 
        const newRoom = new Room({
            name,
            description,
        });

        const room = await newRoom.save();
        res.status(200).json({ message: 'New Room Created', room });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error.message });
    }
};




//display all rooms
export const displayAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();


        res.status(200).json({ rooms })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
