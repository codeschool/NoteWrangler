var bcrypt, encryptionUtil;
bcrypt = require('bcrypt');
var salt = "$2a$10$4u0KgeI40vhqD4DN73Ljsu"

// This is a simplistic password encryption helper that uses bcrypt.
encryptionUtil = {
  encryptPassword: function(password) {
    var encryptedPassword;
    if (salt == null) {
      salt = bcrypt.genSaltSync();
    }
    encryptedPassword = bcrypt.hashSync(password, salt);
    return {
      salt: salt,
      encryptedPassword: encryptedPassword
    };
  },
  comparePassword: function(password, encryptedPasswordToCompareTo) {
    var encryptedPassword;
    encryptedPassword = this.encryptPassword(password, salt).encryptedPassword;
    return encryptedPassword === encryptedPasswordToCompareTo;
  }
};

module.exports = encryptionUtil;
