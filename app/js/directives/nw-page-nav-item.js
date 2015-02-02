angular.module('NoteWrangler').directive('nwPageNavItem', function($location) {
  return {
    replace: true,
    restrict: "E",
    scope: {},
    transclude: true,
    templateUrl: '/templates/directives/nw-page-nav-item.html',
    link: function(scope, element, attrs, ctrl, transclude) {

      // Perform a manual transclude here so we can get the page name from the contents
      // of the pageNav item.
      transclude(function(clonedElement) {
        scope.pageName = clonedElement.text().toLowerCase();
        element.append(clonedElement);
      });
      
      // This regex finds the first part of a url ex:
      // /notes/2/edit returns notes
      //
      // \/([^\/]*)\/?
      //            ^ Look for 0 or 1 of an escaped `/` to ensure we don't go past the first url item
      //      ^ look for an unlimited number of all characters except for `/`, capture the result (the '^' within `[]` part excludes all following characters)
      //  ^ escaped `/`
      scope.selected = function() {
        return $location.path().match(/\/([^\/]*)\/?/)[1];
      };
    }
  };
});
