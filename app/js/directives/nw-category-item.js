angular.module('NoteWrangler')
.directive('nwCategoryItem', function() {
  return {
    restrict: "E",
    require: "^nwCategorySelect",
    scope: {
      category: "="
    },
    templateUrl: '/templates/directives/nw-category-item.html',
    link: function(scope, element, attrs, nwCategorySelectCtrl) {
      scope.isActive = function() {
        return nwCategorySelectCtrl.getActiveCategory() === scope.category.name;
      }

      scope.makeActive = function(){
        nwCategorySelectCtrl.setActiveCategory(scope.category);
      }

      scope.categoryCount = function() {
        return nwCategorySelectCtrl.getNotesCountForCategory(scope.category);
      }

      scope.makeInactive = function(evt){
        // Required to stop the makeActive click handler from firing on the parent element
        evt.stopPropagation();
        nwCategorySelectCtrl.setActiveCategory(false)
      }
    }
  };
});

//simple version
// angular.module('NoteWrangler')
// .directive('nwCategoryItem', function() {
//   return {
//     restrict: "E",
//     require: "^nwCategorySelect",
//     scope: {
//       category: "="
//     },
//     templateUrl: '/templates/directives/nw-category-item.html',
//     link: function(scope, element, attrs, nwCategorySelectCtrl) {
//       scope.categoryActive = function() {
//         return nwCategorySelectCtrl.getActiveCategory() === scope.category.name;
//       }
//
//       scope.makeActive = function(){
//         nwCategorySelectCtrl.setActiveCategory(scope.category);
//       }
//     }
//   };
// });
