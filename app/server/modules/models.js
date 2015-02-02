/*
This file is for configuring the model relations. For example, users can have many
notes and notes belong to a user. This module can also be required in other modules to
avoid always need sequelize as well to import the models
*/

var Sequelize = require('sequelize');

// We're using sqlite for this demo app, so the username and password don't really
// matter, anything works. Other databases such as postgresql could be used here instead.
// see: http://sequelizejs.com/docs/1.7.8/usage#basics
// for more information on how this can be configured.
var sequelize = new Sequelize('note_wrangler', 'username', 'password', {
  dialect: "sqlite",
  port:    3306,
  storage: './database.sqlite' // Local to where app.js is running from
});

var User = sequelize.import(__dirname + "/models/user");
var Note = sequelize.import(__dirname + "/models/note");
var Category = sequelize.import(__dirname + "/models/category");

// Set user/note associations
User.hasMany(Note);
Note.belongsTo(User);

// Set note/note type associations
Category.hasMany(Note);
Note.belongsTo(Category);

module.exports = {
  User: User,
  Note: Note,
  Category: Category,
  sequelize: sequelize
}
