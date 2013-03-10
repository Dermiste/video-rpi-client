/**
 * New node file
 */
 
var ioClient = require('socket.io-client');
var config = require(__dirname+'/config.json');
var clientData = require(__dirname+'/clientData.json');

var exec = require('child_process').exec;

//console.log(config);
 
var client = ioClient.connect(config.serverIP+':'+config.serverPort);
client.on('connect', function () {
	console.log('Client ::  connected!');

	client.emit('setID',{id:clientData.clientID});
	client.emit('joinRoom',{room:'rpi'});
});

client.on('error', function () {
  console.log('Client :: error while trying to connect to '+config.serverIP+':'+config.serverPort);
});

client.on('hello',function(data){
	console.log('Client ::  socket said hello with '+data.hello);	
});

client.on('broadcast',function(data){
	console.log('Client ::  socket broadcast something');
});

client.on('play',function(data){
	var time = new Date();
	console.log(time.getTime());
	console.log('Client ::  play received @ '+time.getTime()+' Lauching shell script');
	console.log(__dirname+'/run.sh '+clientData.video);
	var child;
	child = exec(__dirname+'/run.sh '+clientData.video);
	child.stdout.on('data', function (data) {
 		console.log('stdout : '+data);
	});
	child.stderr.on('data', function (data) {
 		console.log('stderr : '+data);
	});	
});
