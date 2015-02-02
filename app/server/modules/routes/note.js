var models = require('../models');
var Note = models.Note;
var User = models.User;
var Category = models.Category;
var noteSafeParams = ["id", "link","description","title","icon","content", "userId", 'CategoryId'];
var userSafeParams = ['id', 'name', 'username', 'bio', 'twitter_handle', 'site'];

module.exports = function(app) {
  app.get('/notes', function(req, res) {
    models.sequelize.sync().on('success', function() {
      Note.findAll({attributes: noteSafeParams, include: [Category, {model: User, attributes: userSafeParams}]}).success(function(notes) {
        res.json(notes);
      })
    });
  });
  
  app.post('/notes', function(req, res) {
    models.sequelize.sync().on('success', function() {
      Note.create({UserId: req.user.id, CategoryId: req.param('CategoryId'), link: req.param('link'), title: req.param('title'), content: req.param('content'), description: req.param('description'), icon: req.param('icon')}).success(function(notes) {
        res.json(notes);
      })
    });
  });
  
  app.put('/notes', function(req, res) {
    var param;
    var updateParams = {};
    var noteId = parseInt(req.param('id'));

    models.sequelize.sync().on('success', function() {
      Note.find({where: {id: noteId}, attributes: noteSafeParams, include: [Category]}).success(function(note) {

        // Return an 401 aunauthorized if a user tries to editor another user's note
        if(!req.user || req.user.id !== note.values.UserId) {
          res.status(401);
          res.json({error: "You are not authorized to edit this note"});
          return;
        }
        
        // Loop through the noteSafeParams and update their values from the given ones.
        for(var i=0, l = noteSafeParams.length; i < l; i++ ) {
          param = noteSafeParams[i];
          updateParams[param] = req.param(param);
        }

        note.updateAttributes(updateParams).success(function() {
          res.json(note);
        });
      });
    });
  });

  app.get('/notes/:id', function(req, res) {
    var noteId = parseInt(req.params.id, 10);
    
    // If a note is not found at the given id, return an empty object
    if(!noteId) {
      res.json({});
      return;
    }

    models.sequelize.sync().on('success', function() {
      Note.find({where: {id: noteId}, attributes: noteSafeParams, include: [Category, {model: User, attributes: userSafeParams}]}).success(function(note) {
        res.json(note);
      });
    });
  });
};
