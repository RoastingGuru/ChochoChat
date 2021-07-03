

// For node server handeling
console.log('My socket server is running');
const io = require('socket.io')(2000, {
  
    cors:{
        origin:"*"
    }
})

const users = {};
io.on('connection', Socket=>{
    //console.log( Socket.client.conn.server.clientsCount + " users connected" );
    Socket.on('new-user-joined', name =>{
        users[Socket.id] = name;
        Socket.broadcast.emit('user-joined', name);
    })

    Socket.on('send', message =>{
        Socket.broadcast.emit('receive',{message: message, name: users[Socket.id]})
    });

Socket.on('disconnect', message=>{
    Socket.broadcast.emit('left', users[Socket.id]);
    delete users[Socket.id];
})


})