/*
This is a way of handling ajax requests using NgResource, it performs a similar function
to the UserService.
*/

// angular.module('NoteWrangler')
// .factory('User', function UserFactory($resource) {
//   return $resource('/users/:id', {}, {
//     update: {
//       method: "PUT"
//     }
//   });
// });
//

angular.module('NoteWrangler')
.factory('User', function UserFactory($firebaseArray) {
  return function(){
    var ref = new Firebase('https://notewrangler.firebaseio.com/users');
    return $firebaseArray(ref);
  };
});
