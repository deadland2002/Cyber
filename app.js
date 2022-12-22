const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.urlencoded({extended:true}));

io.on('connection',(socket)=>{
  console.log("user connected")
  io.emit("user connected",true);
  
  socket.on('Send cipher',(data)=>{
    io.emit("sender Data",data);
  })

  socket.on('Send key',(data)=>{
    io.emit('sender key',data);
  })

  socket.on("reciever ready",(data)=>{
    io.emit("reciever ready",true);
  })



  socket.on("sender ready",(data)=>{
    io.emit("sender ready",true);
  })


})


var crypto = require("crypto");




app.get('/send/:username/:password/',(req,res)=>{
  
  const username = req.params.username;
  const password = req.params.password;

  console.log(username,password);

  if(username=="satvik" && password=="admin"){
    res.sendFile(__dirname+'/sender.html');
  }else{
    res.send("username / password invalid");
  }

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