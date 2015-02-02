angular.module('NoteWrangler').controller('NotesShowController', function($scope, $routeParams, Note, Session) {
  // Without NgResource
  // Note.find($routeParams.id).success(function(data) {
  //   $scope.note = data;
  // });
  
  // With NgResource
  $scope.note = Note.get({id: $routeParams.id})

  Session.sessionData().success(function(sessionUser) {
    $scope.currentUser = sessionUser;
  });
});
