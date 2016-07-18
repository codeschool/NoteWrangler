angular.module('NoteWrangler')
.controller('UsersIndexController', function($scope, User, $gravatar) {

  // Without NgResource
  // User.all().success(function(data) {
  //   $scope.users = data;
  // });

  // With NgResource
  // $scope.users = User.query();

  // With Firebase
  $scope.users = User();

  $scope.gravatarUrl = function(user) {
    return $gravatar.generate(user.email);
  }
});
