// routes/note_routes.js

//Creates a route and passes arguments of the instance of express (app) and a database (db)
module.exports = function(app, db) {
  // When the app receives a post request to the ‘/notes’ path,
  // it will execute the code inside the callback- passing in 
  // a request object (which contains the parameters or JSON of 
  // the request) and a response object (used to reply).
  
  // for parsing db ids for GETs
  var ObjectID = require('mongodb').ObjectID;

  // POSTS
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };  
    db.collection('notes').insert(note, (err, result) => {
      if (err) {res.send({ 'error': 'An error has occurred'});}
      else {res.send(result.ops[0]);}
    });
  });

  // GETS

  app.get('/', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {res.send({'error':'An error has occurred'});}
      else {res.send(item);}
    });}
  );

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {res.send({'error':'An error has occurred'});}
      else {res.send(item);}
    });}
  );

  // DELETEs
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {res.send({'error':'An error has occurred'});}
      else {res.send('Note ' + id + ' deleted!');} 
    });
  });

  // UPDATE
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {res.send({'error':'An error has occurred'});}
      else {res.send(note);} 
    });
  });

};