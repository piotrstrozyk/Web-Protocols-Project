require('dotenv').config({ path: "./config.env" });
const cors = require("cors")
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 8000;
const routes = require('./routes/routes.js')
const uri = process.env.URI;

app.use(cors())
app.use(express.json())

async function connect(){
    try {
        await mongoose.connect(uri)
        console.log("Connected to Mongodb");
    } catch (error) {
        console.error(error);
    }
}

connect();

app.use('/users', routes)

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
