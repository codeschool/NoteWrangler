// In level 3 they need to refactor the code from nw-card.js into a Service:

angular.module('NoteWrangler').factory( 'markdown',  function markdownFactory(){
  return {
    parse: function(text){
      return markdown.toHTML(text);
    }
  }
});
