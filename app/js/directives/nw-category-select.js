angular.module('NoteWrangler')
.directive('nwCategorySelect', function(Category) {
  return {
    replace: true,
    restrict: "E",
    scope: {
      activeCategory: "=",
      notes: "="
    },
    controller: function($scope) {
      this.getActiveCategory = function(){
        return $scope.activeCategory
      }

      this.setActiveCategory = function(category) {
        $scope.activeCategory = category && category.name;
      }

      this.getNotesCountForCategory = function(category) {
        if(!$scope.notes) {
          return 0;
        }

        var count = 0;
        for(var i=0, l = $scope.notes.length; i < l; i++ ) {
          if($scope.notes[i].category.id === category.id) {
            count++;
          }
        }

        return count;
      }
    },
    templateUrl: '/templates/directives/nw-category-select.html',
    link: function(scope, element, attrs) {

      // Initially fetch the categories to use within the sorting menu
      Category.all().then(function(categoryData) {
        scope.categories = categoryData;
      });
    }
  };
});


//simple version

// angular.module('NoteWrangler')
// .directive('nwCategorySelect', function(Category) {
//   return {
//     replace: true,
//     restrict: "E",
//     scope:{activeCategory: '='},
//     controller: function($scope) {
//       this.getActiveCategory = function(){
//         // return $scope.activeCategory
//         return $scope.activeCategory
//
//       }
//
//       this.setActiveCategory = function(category) {
//         // $scope.activeCategory = category.name;
//         $scope.activeCategory = category && category.name;
//       }
//
//       return this;
//     },
//     templateUrl: '/templates/directives/nw-category-select.html',
//     link: function(scope, element, attrs) {
//
//       // Initially fetch the categories to use within the sorting menu
//       Category.all().then(function(categoryData) {
//         scope.categories = categoryData;
//       });
//     }
//   };
// });
