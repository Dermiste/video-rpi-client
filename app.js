/**
 * New node file
 */
 
var ioClient = require('socket.io-client');
var config = require(__dirname+'/config.json');
var clientData = require(__dirname+'/clientData.json');

var exec = require('child_process').exec;

//console.log(config);
 
function launchShellScript(pFileName){
	var time = new Date();
	console.log(time.getTime());
	console.log('Client ::  will launch "'+pFileName+'" script, received @ '+time.getTime());
	var child;
	child = exec(__dirname+'/'+pFileName+clientData.video);
	child.stdout.on('data', function (data) {
 		console.log('stdout : '+data);
	});
	child.stderr.on('data', function (data) {
 		console.log('stderr : '+data);
	});	
} 
 
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
	launchShellScript('play');
});

client.on('pause',function(data){
	launchShellScript('pause');
});

client.on('stop',function(data){
	launchShellScript('stop');
});