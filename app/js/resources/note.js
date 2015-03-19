/*
This is a way of handling ajax requests using NgResource, it performs a similar function
to the Note Service.
*/

// angular.module('NoteWrangler')
// .factory('Note', function NoteFactory($resource) {
//   return $resource('/notes/:id', {}, {
//     update: {
//       method: "PUT"
//     }
//   });
// });

// Firebase way
// angular.module('NoteWrangler')
// .factory('Note', function NoteFactory($firebaseArray) {
//   return function(){
//     // creating the snapshot of our data
//     var ref = new Firebase('https://notewrangler.firebaseio.com/notes');
//     // return a synchronized array
//     return $firebaseArray(ref);
//   };
// });

// Firebase - Normal restful call
angular.module('NoteWrangler')
.factory('Note', function NoteFactory($resource) {
  return $resource('https://notewrangler.firebaseio.com/notes/:id.json', {}, {
    update: {
      method: "PUT"
    }
  });
});
