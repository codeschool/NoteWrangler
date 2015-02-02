var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var encrypt = require('../encrypt');
var models = require('../models');
var User = models.User;
var userSafeParams = ['id', 'name', 'username', 'bio', 'twitter_handle', 'site'];

// Since we're using sequelize, we need to specify how passport (the auth library)
// serializes and deserializes users. In this case we just save the user.id at the
// serialize step and make a query using that id in the deserialize step to retrieve
// the user object.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.find({where: {id: id}, attributes: userSafeParams}).success(function(user) {
    done(null, user);
  }).error(function(err) {
    done(err, null);
  });
});

// Define a local authentication strategy used to authenticate a sequelize user
passport.use(new LocalStrategy(
  function(username, password, done) {
    // get the user from the database
    User.find({ where: { username: username }}).success(function(user) {
      var encryptedPassword = encrypt.encryptPassword(password).encryptedPassword
      if (!user) { // return known user if the user was not found
        done(null, false, { message: 'Unknown user' });
      } else if (encryptedPassword != user.password) { // test that the password is valid
        done(null, false, { message: 'Invalid password'});
      } else { // return the user if all the validations pass
        done(null, user);
      }
    }).error(function(err) {
      done(err);
    });
  }
));

module.exports = function(app) {
  app.get('/sign_in', function(req, res) {
    res.render('session/sign_in', {});
  });

  app.get('/sign_up', function(req, res) {
    res.render('session/sign_up', {});
  });
  
  // Invoking logout() will remove the req.user property and clear the login session (if any).
  // Restfully, this is wrong, this should be a delete request to /session, but for ease of use
  // a lot of people will make this exception. It's much easier for sign out links as a get
  app.get('/sign_out', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // The verify callback for local authentication accepts
  // username and password arguments, which are submitted
  // to the application via a login form.
  app.post('/session', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign_in'
  }));
  
  // End point for returning json data for the session user
  app.get('/session', function(req, res) {
    res.json(req.user);
  });
  
  // Create a new user from the sign_up page
  app.post('/registration', function(req, res) {
    var password = req.param('password');
    if(password === req.param('password_confirm')) {
      // Encrypt password
      var encryptedPassword = encrypt.encryptPassword(password).encryptedPassword;
      
      // create and login newly created user
      User.findOrCreate({name: req.param('name'), username: req.param('username'), password: encryptedPassword}).success(function(user) {
        req.login(user, function(err) {
          return res.redirect('/');
        });
      });
    } else {
      res.redirect('/sign_up');
    }
  });
};
