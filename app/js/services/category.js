angular.module('NoteWrangler').factory('Category', function CategoryFactory($http, $q) {
  var categories;
  
  return {
    all: function() {      
      var deferred = $q.defer();
      
      /*
        Since categories hardly ever change, we want to cache the value after it's been fetched
        once. We use a promise here so that we intercept the value from the $http service and
        save it. If the value has been saved we can resolve with `categories` if not we make
        the ajax call with $http and resolve the promise with the result.
      */
      if(categories) {
        deferred.resolve(categories);
      } else {
        $http({method: 'GET', url: "/categories"})
          .success(function(data) {
            categories = data;
            deferred.resolve(data);
          })
          .error(function(err) {
            deferred.reject(err)
          });
      }
      
      return deferred.promise;
    }
  };
});
