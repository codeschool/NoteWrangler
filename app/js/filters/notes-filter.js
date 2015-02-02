// This is a custom filter which will filter by the filter value and search within the result
// of the category filter using the value from the search. If there is no category value, then
// the search is applied to the entire pool of notes.

// Usage:
//   ng-repeat='note in notes | notesFilter:searchTerm:categoryFilterTerm'
//
// The search term value should come first, followed by the category filter term
//
angular.module('NoteWrangler')
.filter('notesFilter', function(){
  return function(notesInput, titleSearch, category) {
    var note, categoryMatches, titleMatches;
    var result = [];

    for(var i=0, l = notesInput.length; i < l; i++) {
      note = notesInput[i];

      // If the category doesn't exist we'll assume there is no category selected, and not filter by a category
      // if the category does exist, then check to see if the note has a category that matches the category given
      categoryMatches = !category || note.category.name === category;

      // If the titleSearch doesn't exist, we'll assume the search box is empty and not filter by title
      // If the titleSearch does exist, then we'll use a case insensitive(i) regular expression
      // to match the search value to the title.
      titleMatches = !titleSearch || note.header.match(new RegExp(titleSearch, 'i'));

      // If the category matches and title matches then save the note as a result
      if(categoryMatches && titleMatches) {
        result.push(note);
      }
    }

    return result;
  };
});
