angular.module('NoteWrangler').controller('UsersShowController', function($scope, $routeParams, User, $gravatar) {
  
  // Without NgResource
  // User.find($routeParams.id).success(function(data) {
  //   $scope.user = data;
  // });
  
  // With NgResource
  $scope.user = User.get({id: $routeParams.id});
  
  $scope.gravatarUrl = function(user) {
    return $gravatar.generate(user.email);
  }
});
