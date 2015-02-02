// Declare app level module which depends on ngRoute
angular.module('NoteWrangler', ['ngRoute', 'ngResource', 'Gravatar'])
.config(function($gravatarProvider){
  $gravatarProvider.setSize(100);
});
