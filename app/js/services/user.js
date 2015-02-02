/*
This is an example of how to handle ajax data calls without using NgResource
This is for reference only, we favor using Note over this in the app.
*/
angular.module('NoteWrangler').factory('User', function UserFactory($http) {
  return {
    all: function() {
      return $http({method: 'GET', url: '/users'});
    },
    find: function(id){
      return $http({method:'GET', url: '/users/' + id});
    },
    update: function(userObj){
      return $http({method: 'PUT', url: '/users/' + userObj.id, data: userObj});
    }
  }
});
