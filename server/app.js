const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 6000;

//server middleware

app.use(express.json())

//server
app.listen(PORT, (req, res) => {
    console.log(`Server is running on: ${PORT} `)
});