/**
 * New node file
 */
 
var ioClient = require('socket.io-client');
var config = require(__dirname+'/config.json');
var clientData = require(__dirname+'/clientData.json');

var exec = require('child_process').exec;
 
var client = ioClient.connect(config.serverIP+':'+config.serverPort);

var omxProcess;
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
	console.log('Client ::  will launch play script, received @ '+time.getTime());
	omxProcess = exec(__dirname+'/play.sh '+clientData.video);
	omxProcess.stdout.on('data', function (data) {
 		console.log('stdout : '+data);
	});
	omxProcess.stderr.on('data', function (data) {
 		console.log('stderr : '+data);
	});	
});

client.on('pause',function(data){
	if (omxProcess){
		omxProcess.stdin.write("p");
	}
});

client.on('stop',function(data){
	if (omxProcess){
		omxProcess.stdin.write("q");
		omxProcess = null;		
	}
});