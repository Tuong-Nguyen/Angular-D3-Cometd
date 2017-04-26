var express = require('express');
var app		= express();
var server 	= require('http').createServer(app);
var io 		= require('socket.io').listen(server);

//Env initial
require('dotenv').config();
dotenv = require('dotenv');
dotenv.load();

server.listen(process.env.PORT);

//Pblic folder
app.use(express.static(__dirname + '/client'));

//index page
app.get('/', function(req, res){
	res.sendFile(__dirname + '/client/client.html');
})

//index page
app.get('/server', function(req, res){
	res.sendFile(__dirname + '/client/server.html');
})

