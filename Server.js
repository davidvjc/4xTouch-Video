//This node.js using Express server serves a file host.html with a video and a file index.html for everyone else
//Client sends touch data to this server, twhich then emits it back to all clients
//Only one client however, the host.html reads this data and integrates it into it's functionality
//to run this in terminal: go to the folder, run node index.js, then go to localhost:3000/ for client and /host.html for video
 
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.get('/', function(req, res){
	//server html file
  res.sendfile('index.html');
});
 
app.get('/host.html', function(req, res){
	//server html file
  res.sendfile('host.html');
});
 
app.get('/final2.mp4', function(req, res){
	//server html file
  res.sendfile('final2.mp4');
});
 
io.on('connection', function(socket){
	//receive the data
  socket.on('touch data', function(msg){
 
    	var newmsg = msg;
    	//emit back to all clients
        io.emit('touch data', newmsg);
        console.log("send back out: " + newmsg);
 
        //check if the server is receiving a message
        console.log("server: " + msg);
 
  });
});
 
//define port
http.listen(3000, function(){
  console.log('listening on port 3000');
});
