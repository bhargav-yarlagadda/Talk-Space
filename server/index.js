const express = require("express")
const http = require("http")
const socketio = require("socket.io")
const app = express()
const server = http.createServer(app)
const router = require("./router")
const io = socketio(server)
const PORT = 5173 

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


