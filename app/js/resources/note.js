/*
This is a way of handling ajax requests using NgResource, it performs a similar function
to the Note Service.
*/
//
// angular.module('NoteWrangler').factory('Note', function NoteFactory($resource) {
//   return $resource('/notes/:id', {}, {
//     update: {
//       method: "PUT"
//     }
//   });
// });


angular.module('NoteWrangler')
.factory('Note', function NoteFactory($firebase) {
  return function() {
    // creating a snapshot of our data
    var ref = new Firebase("https://notewrangler.firebaseio.com/notes");
    // using $firebase to synchronize data between clients and database and turn it into an object
    var sync = $firebase(ref);
    return sync.$asObject();
  }
});
