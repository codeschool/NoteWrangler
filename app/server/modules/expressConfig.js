var passport = require('passport');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

module.exports = function(app, express) {
  // Serve static assets from the app folder. This enables things like javascript
  // and stylesheets to be loaded as expected. You would normally use something like 
  // nginx for this normally, but this makes for a simpler demo app to just let express do it.
  app.use("/", express.static("app/"));
  app.set('views', __dirname + '/../views'); // Set the view directory, this enables us to use the .render method inside routes
  app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json

  // Setup cookie sessions
  app.use(cookieParser());
  app.use(cookieSession({secret: 'Super secret, this should be something super secure'}));
  
  // Add CSRF token to requests to secure our ajax requests from the angular.js app
  app.use(csrf());
  
  app.set('view engine', 'ejs'); // Set the template engine to ejs

  // This is a little custom middleware which adds the csrf token to local variables
  // which can be used used within ejs template forms by doing something like:
  // <form>
  //   <input type="hidden", name="_csrf", value='<%-csrfToken%>'>
  //   ... other inputs and submit buttons
  // </form>
  //
  // Setting the: res.cookie('XSRF-TOKEN', req.csrfToken()); is for angularJS
  // AngularJs looks for this cookie, and if it exists it sends it along with each
  // ajax request made with the $http service.
  app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
  
  // Initialize passport middleware for user authentication
  app.use(passport.initialize());
  app.use(passport.session());
}
