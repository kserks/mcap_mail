const express = require('express'); 
//const { Server } = require('socket.io');

const PORT = 3011  

/*
const io = new Server(PORT)

io.on('connection', socket => {

  socket.on('send_mail', body=>{
      socket.emit("get_mail", body);
  })

});
*/

const app = express();
