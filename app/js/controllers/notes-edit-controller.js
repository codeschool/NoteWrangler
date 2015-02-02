angular.module('NoteWrangler').controller('NotesEditController', function($scope, $routeParams, Note, Category, Session) {
  // Without NgResource
  // Note.find($routeParams.id).success(function(noteData) {
  //   $scope.note = noteData;
  // });
  
  Session.authenticate();
    
  // With NgResource
  $scope.note = Note.get({id: $routeParams.id})

  // Fetch the node types to use within the sorting menu
  Category.all().then(function(categoryData) {
    $scope.categories = categoryData;
  });
  
  $scope.updateNote = function(note) {
    $scope.errors = null;
    $scope.updating = true;

    // Without NgResource
    // Note.update(note).catch(function(noteData) {
    //   $scope.errors = [noteData.data.error];
    // }).finally(function() {
    //   $scope.updating = false;
    // });
    
    // With NgResource
    note.$update().catch(function(noteData) {
      $scope.errors = [noteData.data.error];
    }).finally(function() {
      $scope.updating = false;
    });
  };
});
