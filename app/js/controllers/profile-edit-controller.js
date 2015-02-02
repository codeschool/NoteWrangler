angular.module('NoteWrangler').controller('ProfileEditController', function($scope, $location, User, Session) {
  
  // Redirect if a user is not logged in
  Session.authenticate();
  
  // Grab the current session user for it's ID
  Session.sessionData().success(function(sessionUser) {
    // Create a new User from the session user data
    $scope.user = new User(sessionUser);
  });
  
  $scope.updateUser = function(user) {
    $scope.errors = null;
    $scope.updating = true;

    // Without NgResource
    // User.update($scope.user).catch(function(userData) {
    //   $scope.errors = [userData.data.error];
    // }).finally(function() {
    //   $scope.updating = false;
    // });
    
    // With NgResource
    user.$update().catch(function(userData) {
      $scope.errors = [userData.data.error];
    }).finally(function() {
      $scope.updating = false;
    });
  };
});
