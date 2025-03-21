require('dotenv').config({ path: "./.env" });
const fs = require('fs')
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

const https = require('https')
const http = require('http');
const server = http.createServer(app);

const key = fs.readFileSync('./openssl.key')
const cert = fs.readFileSync('./openssl.crt')
const path = require('path');

app.use(cookieParser())
app.use(flash())
app.use(express.urlencoded( { extended: false }))
app.use(cors({ origin: 'https://localhost:3001', credentials: true, exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }))
app.use(express.json())
app.use(routes)
// Middleware ustawiający nagłówki CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://localhost:3001'); // Ustaw origin na dowolną domenę (*), możesz dostosować do konkretnej domeny
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' https:;"); // Umożliwia ładowanie zasobów z bieżącej domeny i zasobów HTTPS
  next();
});
  
async function connect(){
    try {
        await mongoose.connect(uri)
        console.log("Connected to Mongodb");
    } catch (error) {
        console.error(error);
    }
}

connect();

// app.listen(3000, () => {
//     console.log("Server started on port 3000");
// });

const sslServer = https.createServer({
    key: key,
    cert: cert
}, app)

sslServer.listen(3000, () => console.log("Secure server on port 3000"))