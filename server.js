var express = require('express');
var app  = express();


app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//the port when the page start
app.listen('4000',function(){
	console.log("Server running at port 4000");
});

//the default page when the server start
app.get('/',function(request,response){
	response.sendFile('home.html',{root:__dirname + '/public'});
});