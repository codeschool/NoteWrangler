/*
This is a combination model/migration/database table definition. See:
http://sequelizejs.com/docs/1.7.8/models#definition
for more information.

This particular model is for notes
*/

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Note", {
    link: DataTypes.STRING,
    description: DataTypes.TEXT,
    title: DataTypes.STRING,
    icon: DataTypes.STRING,
    content: DataTypes.TEXT
  });
}
