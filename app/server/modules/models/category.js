/*
This is a combination model/migration/database table definition. See:
http://sequelizejs.com/docs/1.7.8/models#definition
for more information.

This particular model is for categories
*/

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Category", {
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  });
}
