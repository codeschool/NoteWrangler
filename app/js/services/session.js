/*
  The idea behind this service is that we start off the fetching of the session as soon
  as the service loads. Any subsequent requests for the session data are just returned
  the promise so redunant ajax calls are not made.
*/
angular.module('NoteWrangler').factory('Session', function SessionFactory($http, $location) {
  var sessionPromise = $http({method: 'GET', url: "/session"});

  return {
    sessionData: function() {
      return sessionPromise;
    },
    
    authenticate: function() {
      this.sessionData().then(function(sessionUser){
        if(!sessionUser || !sessionUser.data.id) {
          $location.path('/');
        }
      });
    }
  };
});
