const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const corsOptions={
    cors: true,
    origins:["http://localhost:5000"],
   }

const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
// const io = socketio(server);
const io = socketio(server, corsOptions);
app.use(cors());
app.use(router);
var rooms=[]
var r=0;
var users=[]
var groups=[]
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    
    if(rooms.length===0)
    {
      rooms.push(''+ ++r)
    }
    
    console.log("rooms=",rooms)
    
    var __FOUND = users.find(function(thisuser, index) {
      if(thisuser.id == socket.id)
        return true;
    });
    if(!__FOUND)
    {
      users.push({
        id : socket.id,
        userName : name
    });
    }

    console.log("users:")
    console.log(users)
    
  room=""+rooms[rooms.length-1]

    const { error, user } = addUser({ id: socket.id, name, room });
    
    if(error) return callback(error);
    socket.emit('roomno',`${user.room}`)
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    if(getUsersInRoom(user.room).length==1)
    {
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `searching for users to talk to` });
    }
    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    
    console.log("no of users=",getUsersInRoom(user.room).length)
    if(getUsersInRoom(user.room).length==2)
      {
        
        rooms.pop()
        rooms.push(''+ ++r)
      }
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(message)
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    callback();
  });
 
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
   
    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      if(getUsersInRoom(user.room).length==1)
      {
        rooms.push(user.room)
      }
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));