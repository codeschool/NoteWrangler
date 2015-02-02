/*
This is a way of handling ajax requests using NgResource, it performs a similar function
to the Note Service.
*/

angular.module('NoteWrangler').factory('Note', function NoteFactory($resource) {  
  return $resource('/notes/:id', {}, {
    update: {
      method: "PUT"
    }
  });
});
