// const express = require('express')

// const app = express()

// const http = require('http').createServer(app)

// const PORT = process.env.PORT || 3000

// http.listen(PORT, ()=>{
//     console.log(`Listening of port ${PORT}`)
// })

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname+'/index.html')
// })

const http = require('http');

const express = require('express');

const app = express();

const PORT = 3000;

const path = require('path');

const { Socket } = require('dgram');

const server = http.createServer(app);


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'node_modules')));



server.listen(PORT, ()=>{
    console.log("Express server started and its running on port 3000.")
});

const io = require('socket.io')(server);

const users = {};

io.on('connection', (socket)=>{
    socket.on('new-user-joined', (name)=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', (message)=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', (message)=>{
        socket.broadcast.emit('leave-chat', users[socket.id]);
        delete users[socket.id];
    });
});