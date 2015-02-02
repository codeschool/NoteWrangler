// This module depends on the google CryptoJS library, you can load it by adding:
// <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
// to your page

angular.module('Gravatar', [])
.provider('$gravatar', function() {
  var avatarSize = 80; // Default size
  var avatarUrl = "http://www.gravatar.com/avatar/";

  this.setSize = function(size) {
    avatarSize = size;
  }

  this.$get = function(){
    return {
      generate: function(email){
        return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString()
      }
    }
  }
});


/*
These two are exactly the same. The above provider adds the `this.setSize` function for configuration
*/
// angular.module('NoteWrangler').factory('GravatarService', function() {
//   var avatarSize = 80; // Default size
//   var avatarUrl = "http://www.gravatar.com/avatar/";
//
//   return {
//     generate: function(email){
//       return avatarUrl + CryptoJS.MD5(email); + "?size=" + avatarSize.toString()
//     }
//   }
// });

// angular.module('NoteWrangler').provider('GravatarService', function gravatarServiceProvider() {
//   var avatarSize = 80; // Default size
//   var avatarUrl = "http://www.gravatar.com/avatar/";
//
//   this.$get = function(){
//     return {
//       generate: function(email){
//         return avatarUrl + CryptoJS.MD5(email); + "?size=" + avatarSize.toString()
//       }
//     }
//   }
// });
