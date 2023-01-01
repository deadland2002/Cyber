const express = require('express');
const fs = require('fs');
const app = express();
const https = require('http')



// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
// };


const server = https.createServer(app)

const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.urlencoded({extended:true}));

io.on('connection',(socket)=>{
  console.log("user connected")
  io.emit("user connected",true);

  socket.on("disconnect",()=>{
    console.log("user disconnected");
    io.emit("user disconnected",true);
  })
  
  socket.on('Send cipher',(data)=>{
    io.emit("sender Data",data);
  })

  socket.on('Send key',(data)=>{
    io.emit('sender key',data);
  })

  socket.on("reciever ready",(data)=>{
    io.emit("reciever ready",true);
  })

  socket.on("file sent",(data)=>{
    // console.log("file recieved");
    io.emit("file sent",true);
  })


  socket.on("chunk",(chunk)=>{
    io.emit("chunk redirect",chunk);
  })
  

  socket.on("chunk recieved",(chunk)=>{
    io.emit("chunk queue",true);
  })
  
  
  socket.on("total chunks",(data)=>{
    console.log(data);
    io.emit("total chunks redirect",data);
  })


  socket.on("sender ready",(data)=>{
    io.emit("sender ready",true);
  })
  
  
  socket.on("file type send",(data)=>{
    console.log(data);
    io.emit("file type recieve",data);
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











server.listen(8080,()=>{
  console.log("Server running");
})