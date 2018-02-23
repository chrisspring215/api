// routes/index.js

// Sets noteRoutes to the note_routes.js, setting up all the routes 
const noteRoutes = require('./note_routes');

module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
};