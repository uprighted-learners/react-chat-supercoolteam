import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 6000;
const MONGOURL = process.env.MONGO_URL;

//connect to mongodb and server
mongoose.connect(MONGOURL).then(() => {
    console.log('Mondgodb database is connected!')
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`)
    });
});

//server middleware
app.use(express.json())

