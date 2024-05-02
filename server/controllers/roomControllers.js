import User from '../models/userModel.js';
import Room from '../models/roomModel.js';

export const createRoom = async (req, res) => {
    try {
        const { name, description, addedUsers } = req.body;

        if (!addedUsers || !Array.isArray(addedUsers) || addedUsers.length === 0) {
            return res.status(400).json({ message: 'One or more users not found', addedUsers });
        }
        // Check if all addedUsers exist
        const usersExist = await User.find({ _id: { $in: addedUsers } });
        if (usersExist.length !== addedUsers.length) {
            return res.status(400).json({ message: 'One or more users not found' });
        }
        // Create the room 
        const newRoom = new Room({
            name,
            description,
            addedUsers
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
