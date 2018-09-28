const express = require('express');
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db



MongoClient.connect('mongodb://eunsuh:q123456@ds147942.mlab.com:47942/star-wars-quotes',{ useNewUrlParser: true }, (err,client) =>{
	if(err) return console.log(err)
	   db= client.db('star-wars-quotes')

	   app.listen(3000, () =>{
			 console.log('listening on 3000')
	   })
})

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')	  
})

app.post('/bring', (req,res) =>{
	   db.collection("Test").find(req.body).toArray(function(err, result){
			 if(err) throw err;
			 place = result[0].place;
			 console.log(place)
			 res.redirect('/')
	   }) 
})

