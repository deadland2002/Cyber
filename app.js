const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server);



io.on('connection',(socket)=>{
  console.log("user connected")
  
  socket.on('Send cipher',(data)=>{
    io.emit("sender Data",data);
  })

  socket.on('Send key',(data)=>{
    io.emit('sender key',data);
  })
})


var crypto = require("crypto");




app.get('/send',(req,res)=>{
  res.sendFile(__dirname+'/sender.html');
})

app.get('/recieve',(req,res)=>{
  res.sendFile(__dirname+'/reciever.html');
})

app.get('*',(req,res)=>{
  res.send("server running");
})

server.listen(8000,()=>{
  console.log("Server running");
})