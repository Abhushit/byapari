const socket = require('socket.io');
const config = require('./configs')
const users = [];

module.exports = function(app){
    const io = socket(app.listen(config.socketPort));
    io.on('connection', function(client){
        var id = client.id;
        client.on('new-user',function(username){
            users.push({
                id,
                name:username
            });
            client.emit('users',users);
            client.broadcast.emit('users',users);
        })
        
        
        console.log('client connected to socket server'); 

        // client.emit('hi','hello and welcome to socket server');
        // client.on('hello', function(data){
        //     console.log('hello event>>',data);
        // })

        //new-msg event on onSubmit on client
        client.on('new-msg', function(data){
            client.emit('reply-msg-own',data); //for own client
            client.broadcast.to(data.receiverId).emit('reply-msg',data);   //for each and every client connected to server
        })

        client.on('disconnect', function(){
            users.forEach(function(user,i){
                if(user.id === id){
                    users.splice(i, 1);
                }
                
            })
            client.emit('users',users);
            client.broadcast.emit('users',users);
        })
    })
}