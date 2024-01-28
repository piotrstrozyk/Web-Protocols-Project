require('dotenv').config({ path: "./.env" });
const cors = require("cors")
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
const cookieParser = require('cookie-parser');
const uri = process.env.URI;
const flash = require('express-flash');
const mqtt = require('mqtt');
const mqttServer = 'ws://broker.emqx.io:8084/mqtt'
const mqttClient = mqtt.connect(mqttServer)
const WebSocket = require('ws');


mqttClient.on('error', (err) => {
    console.log('COnnection error', err);
    mqttClient.end()
})
const io = require('socket.io')(3001)
io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)
})

app.use(cookieParser())
app.use(flash())
app.use(express.urlencoded( { extended: false }))
app.use(cors({ origin: 'http://localhost:3001', credentials: true, exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }))
app.use(express.json())
app.use(routes)

async function connect(){
    try {
        await mongoose.connect(uri)
        console.log("Connected to Mongodb");
    } catch (error) {
        console.error(error);
    }
}

connect();

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
