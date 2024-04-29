import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

//route endpoint imports
import userRoutes from './routes/userRoutes.js'

const app = express();
dotenv.config();

app.get('/health/test', (req, res) => {
    res.send('healthy server')
});

const PORT = process.env.PORT || 6000;
const MONGOURL = process.env.MONGO_URL;

import messageRoutes from './routes/messageRoutes.js'

//server middleware
=======
//connect to mongodb and server
mongoose.connect(MONGOURL).then(() => {
    console.log('Mondgodb database is connected!')
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`)
    });
});

//server middleware
app.use(express.json())


//server
app.listen(PORT, (req, res) => {
    console.log(`Server is running on: ${PORT} `)
});

app.use(messageRoutes)
=======
//call endpoint routes
app.use(userRoutes);

