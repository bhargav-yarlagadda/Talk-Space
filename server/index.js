const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true // Allows the browser to include cookies with requests
  }
});

const router = require("./router");
const PORT = 5000;

// Use CORS middleware for general HTTP routes
app.use(cors());

io.on("connection", (socket) => {
  console.log("user connected!");
  
    socket.on("join",({name,room},callBack)=>{
        console.log(name,room)
        
    })


  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("Error while connecting to port", PORT);
  } else {
    console.log("Listening on port", PORT);
  }
});

app.use(router);
