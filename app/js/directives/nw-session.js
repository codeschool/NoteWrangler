angular.module('NoteWrangler').directive('nwSession', function(Session) {
  return {
    replace: true,
    restrict: 'E',
    scope: {},
    templateUrl: '/templates/directives/nw-session.html',
    link: function(scope, element, attrs) {
      Session.sessionData().success(function(data) {
        scope.session = data;
      });
    }
  };
});
