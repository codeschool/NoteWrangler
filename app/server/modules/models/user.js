/*
This is a combination model/migration/database table definition. See:
http://sequelizejs.com/docs/1.7.8/models#definition
for more information.

This particular model is for users
*/

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    twitter_handle: DataTypes.STRING,
    site: DataTypes.STRING
  });
}
