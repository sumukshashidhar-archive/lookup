var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const fs = require('fs');


app.use(express.static("styles"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
//To get data from the angular project
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


const http = require('http').Server(app);
const io = require('socket.io')(http);


var linkerbot = require('./controllers/linkerbot.js')


var loggedIn = false; 

app.get('/', function(req, res) {
    if(loggedIn) {
        res.redirect('/chat')
    }
    console.log('hit the home page');
    res.render('index.ejs')
})

app.post('/login', function(req, res) {
    if(req.body['Authentication Key'] == "key") {
        loggedIn = true;
        res.redirect('/chat')
    }
})

app.get('/deauth', function(req, res) {
    loggedIn = false;    
})

app.get('/chat', function(req, res) {
    if(loggedIn) {
        res.render('chat.ejs')
    }
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
        var resFromBot = linkerbot.extractMessage(message);
        console.log(resFromBot)
        if(resFromBot["response"] == true) {
            // pass it to the linking bot
            var google_url = "http://www.google.com/search?q=" + resFromBot["message"]
            io.emit('chat_message', '<strong>' + 'LinkFromBot!' + '</strong>: ' + '<a href="'+google_url+'" target="_blank ">' + resFromBot["message"] + '</a>');
        }
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});


const server = http.listen(8080, function() {
    console.log('listening on *:8080');
});