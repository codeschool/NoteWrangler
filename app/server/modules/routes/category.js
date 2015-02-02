var models = require('../models');
var Category = models.Category;

module.exports = function(app) {
  // Return a list of available node types
  app.get('/categories', function(req, res) {
    models.sequelize.sync().on('success', function() {
      Category.findAll().success(function(categories) {
        res.json(categories);
      });
    });
  });
};
