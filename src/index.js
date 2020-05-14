var express = require("express");


var app = express();

app.listen(3000, process.env.IP, function (req,res) {
    console.log("SERVER STARTED");
});


app.get('/works', function(req, res) {
    console.log('hit the works page');
    res.json('server runs')
})