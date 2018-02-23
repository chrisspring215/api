
// Requires express and creates a variable for it
const express        = require('express');
// Requires MongoDB and creates a variable for a MongoClient
const MongoClient    = require('mongodb').MongoClient;
// Requires bodyParser and creates a variable for it
const bodyParser     = require('body-parser');
// Connects to the DB client
const db             = require('./config/db');
// Creates an instance of express called app
const app            = express();
// Sets the port for app
const port = 8000;
// Uses bodyparser to process URL encoded forms
app.use(bodyParser.urlencoded({ extended: true }));


MongoClient.connect(db.url,(err,database) =>{

  if (err) return console.log(err)
  //require('./app/routes')(app,{});
  //check below line changed
   require('./app/routes')(app, database);
  app.listen(port,() => {
      console.log("We are live on"+port); 
  });

})