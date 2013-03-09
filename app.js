/**
 * New node file
 */
 
var ioClient = require('socket.io-client');
var config = require(__dirname+'/config.json');
var clientData = require(__dirname+'/clientData.json');

//console.log(config);
 
var client = ioClient.connect(config.serverIP+':'+config.serverPort);
client.on('connect', function () {
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
