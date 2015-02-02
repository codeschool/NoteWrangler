angular.module('NoteWrangler').controller('NotesCreateController', function($scope, Note, Category, Session) {
  
  // redirect if a user is not logged in
  Session.authenticate();

  // Create a new blank note
  $scope.note = new Note();

  // Fetch the node types to use within the sorting menu
  Category.all().then(function(categoryData) {
    $scope.categories = categoryData;
    $scope.note.CategoryId = categoryData[0].id;
  });

  $scope.updateNote = function(note) {
    $scope.errors = null;
    $scope.updating = true;
    
    // Without NgResource
    // Note.create(note).catch(function(noteData) {
    //   $scope.errors = [noteData.data.error];
    // }).finally(function() {
    //   $scope.updating = false;
    // });
    
    // With NgResource
    note.$save().catch(function(noteData) {
      $scope.errors = [noteData.data.error];
    }).finally(function() {
      $scope.updating = false;
    });
  };
});
