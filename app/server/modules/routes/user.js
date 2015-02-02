var models = require('../models');
var User = models.User;
var Note = models.Note;
var userSafeParams = ['id', 'name', 'username', 'bio', 'twitter_handle', 'site'];

module.exports = function(app){
  app.get('/users', function(req, res){
    models.sequelize.sync().on('success', function(){
      User.findAll({attributes: userSafeParams}).success(function(users){
        res.json(users);
      })
    });
  });

  app.put('/users', function(req, res){
    var param;
    var updateParams = {};
    var userId = parseInt(req.param('id'));
    
    // Return an 401 aunauthorized if a user tries to editor another user's profile
    if(!req.user || req.user.id !== userId) {
      res.status(401);
      res.json({error: "You are not authorized to edit this user"});
      return
    }

    models.sequelize.sync().on('success', function(){
      User.find({where: {id: userId}}).success(function(user){
        for(var i=0, l = userSafeParams.length; i < l; i++ ){
          param = userSafeParams[i];
          updateParams[param] = req.param(param);
        }

        user.updateAttributes(updateParams).success(function(){
          res.json(user)
        })
      });
    });
  });

  app.get('/users/:id', function(req, res){
    var userId = parseInt(req.params.id, 10);
    
    if(!userId) {
      res.json({});
      return;
    }

    models.sequelize.sync().on('success', function(){
      User.find({where: {id: userId}, attributes: userSafeParams, include: [Note]}).success(function(user){
        res.json(user);
      })
    });
  });
};
