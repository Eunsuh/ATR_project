const express = require('express');
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const zerorpc = require("zerorpc");

var db
var place

MongoClient.connect('mongodb://eunsuh:q123456@ds147942.mlab.com:47942/star-wars-quotes',{ useNewUrlParser: true }, (err,client) =>{
	if(err) return console.log(err)
	   db= client.db('star-wars-quotes')

	   app.listen(4242, () =>{
			 console.log('listening on 4242')
	   })
})

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index2.html')	  
})

app.post('/', (req,res) =>{
	   db.collection("Test").find(req.body).toArray(function(err, result){
		/*	if(place == undefined)  {
				   console.log("Don't know where it is")
				   return res.redirect('/')
			};
		*/	 
			 p = result[0].place;

			 var server = new zerorpc.Server({
				    hello:function(name, reply){
						  reply(null, p);
				    }
			 });

			 server.bind("tcp://0.0.0.0:3000")
			 console.log(p);
			 
	   }) 
})

