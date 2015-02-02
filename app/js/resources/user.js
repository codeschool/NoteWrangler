/*
This is a way of handling ajax requests using NgResource, it performs a similar function
to the UserService.
*/

angular.module('NoteWrangler').factory('User', function UserFactory($resource) {  
  return $resource('/users/:id', {}, {
    update: {
      method: "PUT"
    }
  });
});
