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
	res.sendFile(__dirname + '/client/index.html');
})

//index page
app.get('/data', function(req, res){
	res.sendFile(__dirname + '/client/data.html');
})

//index page
app.get('/line-chart', function(req, res){
	res.sendFile(__dirname + '/client/line-chart.html');
})

var data = [{
	    key: "Cumulative Return",
	    values: [
	        { "label" : "A" , "value" : -29.765957771107 },
	        { "label" : "B" , "value" : 0 },
	        { "label" : "C" , "value" : 32.807804682612 },
	        { "label" : "D" , "value" : 196.45946739256 },
	        { "label" : "E" , "value" : 0.19434030906893 },
	        { "label" : "F" , "value" : -98.079782601442 },
	        { "label" : "G" , "value" : -13.925743130903 },
	        { "label" : "H" , "value" : -5.1387322875705 }
	        ]
	    }];
var type = 'discreteBarChart';

io.sockets.on('connection', function(socket){

	//Sync data
	socket.on("sync", function(callback){
		io.sockets.emit('newData', {type: type, data: data});
		callback(true)
	})

	//Update config
	socket.on("updateConfig", function(newConfig, callback){
		type = newConfig;
		io.sockets.emit('updateConfig', {type: type, data: data});
		callback(true)
	})

	//Update data
	socket.on("update", function(newData, callback){	
		data = newData;	
		//update status
		io.sockets.emit('newData', {type: type, data: data});
		callback(true);
	})
})

