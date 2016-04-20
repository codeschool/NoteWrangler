angular.module('NoteWrangler')
.directive('nwCard', ['$sce', function($sce) {
  return {
    replace: true,
    restrict: "E",
    scope: {
      header: "=",
      body: "=",
      image: "=",
      icon: "@",
      id: "=",
      type: "@"
    },
    templateUrl: "templates/directives/nw-card.html",
    link: function(scope, element) {
      if(scope.body){
        scope.body = $sce.trustAsHtml(markdown.toHTML(scope.body.toString()));
      }
    }
  };
}]);


/*
//  In Level 3 Challenges, after they refactored the above and created a markdownFactory Service they will need to change the nwCard Directive to actually USE the Service.

angular.module('NoteWrangler').directive('nwCard', ['markdown', '$sce', function(markdown, $sce) {
  return {
    replace: true,
    restrict: "E",
    scope: {
      title: "=",
      body: "=",
      image: "=",
      icon: "@",
      id: "=",
      type: "@"
    },
    templateUrl: "templates/directives/nw-card.html",
    link: function(scope, element) {
      scope.body = $sce.trustAsHtml(markdown.parse(scope.body));
    }
  };
}]);

*/
