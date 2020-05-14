var express = require("express");
var app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);


var linkerbot = require('./controllers/linkerbot.js')

app.get('/', function(req, res) {
    console.log('hit the home page');
    res.render('index.ejs')
})



io.sockets.on('connection', function(socket) {
    // write all the realtime communication functions here
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + 'has joined the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + 'has left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        //have to parse this message first
        console.log(linkerbot.checkMessage(message))
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});


const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});