/*
This is an example of how to handle ajax data calls without using NgResource
This is for reference only, we favor using Note over this in the app.
*/

angular.module('NoteWrangler')
.factory('Note', ['$http', function NoteFactory($http) {
  return {
    all: function() {
      return $http({method: 'GET', url: "/notes"});
    },
    find: function(id){
      return $http({method:'GET', url: '/notes/' + id});
    },
    update: function(noteObj) {
      return $http({method: 'PUT', url: '/notes', data: noteObj});
    },
    create: function(noteObj) {
      return $http({method: 'POST', url: '/notes', data: noteObj});
    }
  };
}]);
