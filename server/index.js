const express = require("express")
const socketio = require("socket.io")
const io = socketio(server)
const router = require("./router")
const http = require("http")
const PORT = 5173 
const server = http.createServer(app)
const app = express()

io.on("connection",(socket)=>{
    consolelog("user connected!")


    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})




server.listen(PORT, (err)=>{
    if(err){
        console.log("error while connection to port",PORT)
    }else{
        console.log("listening on port ",PORT)
    }
} )


app.use(router)


