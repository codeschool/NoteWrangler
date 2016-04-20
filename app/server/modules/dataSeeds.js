/*
This file is used to add some default seed data to the database when the app is initially
setup. Normally this module would be ran from something like a grunt task so that it only
runs once.
*/

var models = require("./models");
var User = models.User;
var Note = models.Note;
var Category = models.Category;
var encrypt = require("./encrypt");

module.exports = {
  seed: function() {
    models.sequelize.sync().on("success", function() {

    // User seeds
    User.findOrCreate({
      "username": "zeldman",
      "name": "Jeffery Zeldman",
      "bio": "Founder, Happy Cog studios. Author, Designing With Web Standards. Publisher, A List Apart, A Book Apart.",
      "twitter_handle": "@zeldman",
      "site": "zeldman.com"
    });

    User.findOrCreate({
      "username": "b_green",
      "name": "Brad Green",
      "bio": "I work at Google where I manage AngularJS and Google's internal sales productivity applications. I'm a dad.",
      "twitter_handle": "@bradlygreen",
      "site": "google.com/+BradGreen"
    });

    User.findOrCreate({
      "username": "Meyer the Eric",
      "name": "Eric A. Meyer",
      "bio": "Web standards | (X)HTML | CSS | microformats | community | writing | speaking | signing man.",
      "twitter_handle": "@meyerweb",
      "site": "meyerweb.com"
    });

    User.findOrCreate({
      "username": "GP",
      "name": "Gregg Pollack",
      "bio": "Founder of Envy Labs, Code School, Orlando Ruby Users Group, BarCamp Orlando, and the Orlando Tech Events newsletter.",
      "twitter_handle": "@greggpollack",
      "site": "EnvyLabs.com"
    });

    User.findOrCreate({
      "username": "r_higley",
      "name": "Rachel Higley",
      "bio": "A web developer located in central florida",
      "twitter_handle": "@RachelHigley",
      "site": ""
    });

    User.findOrCreate({
      "username": "zach",
      "name": "Zachary Nicoll",
      "bio": "Bio sections always intimidate me. I can never think of anything to say that will achieve that awe inspiring effect I want it to have.",
      "twitter_handle": "@turtleguyy",
      "site": "zacharynicoll.com"
    });

    User.findOrCreate({
      "username": "renz",
      "name": "Adam Rensel",
      "bio": "Web Developer at @envylabs and @codeschool",
      "twitter_handle": "@adamrensel",
      "site": "adamrensel.com"}).success(function(user){

    // Note Types
    Category.findOrCreate({"name": "Testing", "icon": "tumblr"});
    Category.findOrCreate({"name": "Personal Note", "icon": "pencil"});
    Category.findOrCreate({"name": "Bash", "icon": "terminal"});
    Category.findOrCreate({"name": "Idea", "icon": "lightbulb"});
    Category.findOrCreate({"name": "Use with Caution","icon": "warning"});
    Category.findOrCreate({"name": "Question", "icon": "question"}).success(function(type){

        // Create notes for the Question note type
        Note.findOrCreate({
          "UserId": user.id,
          "CategoryId": type.id,
          "link" : "",
          "description" : "Clarify the confusion between Service the term and `service` the angular method and to explain the 5 different Service recipes in Angular.",
          "title" : "Service Service? Really Angular?","content": "There are 5 Recipes used to create a Service. One of those *was* unfortunately named, Service. So yes, amongst its fellow peers such as Provider Service and Factory Service, there is in fact a Service Service.",
          "icon" : "question"
        });

        Note.findOrCreate({
          "UserId": user.id,
          "CategoryId": type.id, "link" : "",
          "description" : "QUESTIONABLE DESCRIPTION GOES HERE",
          "title" : "TEST TEST TEST",
          "content": "QUESTIONABLE CONTENT GOES HERE",
          "icon" : "question"
        });

        Note.findOrCreate({
          "UserId": user.id,
          "CategoryId": type.id,
          "link" : "",
          "description" : "Define Service",
          "title" : "What is a Service",
          "content": "Service: Angular services are objects that are wired together using dependency injection (DI). You can use services to organize and share code across your app.",
          "icon" : "question"
        });

        Note.findOrCreate({
          "UserId": user.id,
          "CategoryId": type.id,
          "description" : "Steps for Creating a Service",
          "title" : "How do you create a Service?",
          "content": "You can register a service to our Angular module `app` with a one of the following 5 recipes:\
            \n 	- **factory** \
            \n 	- **provider** \
            \n 	- **service** \
            \n 	- **value** \
            \n 	- **constant** \
            ",
          "icon" : "question"
        });

      }); // Closing Question Category
    });

    User.findOrCreate({
      "username": "ItsThrillhouse",
      "name": "Jason Millhouse",
      "bio": "Course builder. Aspiring writer. Comp Sci guy. Teacher. Sweetfiend. Corgi lover. Gamer who doesn't. Pro Series host. Voice of the UCF Marching Knights. Dork.",
      "twitter_handle": "@ItsThrillhouse",
      "site": ""
    }).success(function(user){

      Category.findOrCreate({
        "name": "Best Practice",
        "icon": "thumbs up outline"
      }).success(function(type){

        // Create notes for the Best Practice note type
        Note.findOrCreate({
          "UserId": user.id,
          "CategoryId": type.id,
          "link" :"https://www.youtube.com/watch?feature=player_detailpage&v=ZhfUv0spHCY#t=1870",
          "description": "NgModel Best Practice",
          "content" : "Always use dot syntax when using NgModel! Treat Scope as read-only in templates & write-only in controllers. The purpose of the scope is to refer to the model, not be the model. The model is your javascript objects. When doing bidirectional binding with ngModel make sure you don't bind directly to the scope properties. This will cause unexpected behavior in the child scopes.",
          "title" : "NgModel BP",
          "icon" : "basic info"
        });
      });
    });

    User.findOrCreate({
      "username": "OlivierLacan",
      "name": "Olivier Lacan",
      "bio": "Software bricoleur at @codeschool, word wrangler, scientific skeptic, and logic lumberjack.",
      "twitter_handle": "@olivierlacan",
      "site": "olivierlacan.com"
    });

    User.findOrCreate({
      "username": "theSmith",
      "name": "Andrew Smith",
      "bio": "iOS & Web Developer at @intelity. @fullsail graduate.",
      "twitter_handle": "@fullsailor",
      "site": "fullsailor.com"
    });

    User.findOrCreate({
      "username": "DrewBarontini",
      "password": encrypt.encryptPassword("secret").encryptedPassword,
      "name": "Drew Barontini",
      "bio": "Front-end developer @codeschool, descendant of @envylabs, real-life extrovert, internet introvert.",
      "twitter_handle": "@drewbarontini",
      "site": "drewbarontini.com"
    });

    User.findOrCreate({
     "username": "JordanWade",
     "password": encrypt.encryptPassword("secret").encryptedPassword,
     "name": "Jordan Wade",
     "bio": "Designer, Illustrator, and Front-End Developer @codeschool",
     "twitter_handle": "@jjordanwade",
     "site": "jamesjordanwade.com"
    });

    User.findOrCreate({
     "username": "AlyssaNicoll",
     "password": encrypt.encryptPassword('secret').encryptedPassword,
     "name": "Alyssa Nicoll",
     "bio": "Code School Teacher. Angular Lover. Scuba Diver.",
     "twitter_handle": "@AlyssaNicoll",
     "site": "alyssa.io"
    }).success(function(user){

      Category.findOrCreate({"name": "Code Snippet", "icon": "code"}).success(function(type){
       // Create notes for the Code Snippet note type

       Note.findOrCreate({
         "UserId": user.id,
         "CategoryId": type.id,
         "link" : "",
         "description" : "Link has *pre* & *post* functions. **Anything that manipulates the DOM goes here!**",
         "title" : "Link",
         "content" : "\
          \n`link: function(scope, element) {\
            \nscope.body = $sce.trustAsHtml(markdown.toHTML(scope.body));\
          \n}`\ ",
         "icon" : "question"
       });

       Note.findOrCreate({
         "UserId": user.id,
         "CategoryId": type.id,
         "link" : "https://docs.angularjs.org/api/ng#directive",
         "description" : "Markers on a **DOM element** that tell AngularJS's HTML compiler `$compile` to attach a specified behavior to that DOM element.",
         "title" : "Directives",
         "icon" : "code",
         "content": "Markers on a **DOM element**"
       });
      });

    });

   });
 }
};
