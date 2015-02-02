module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'app/css/application.css': 'app/sass/application.sass'
        }
      }
    },
    watch: {
      css: {
        files: ['app/sass/**/*.sass'],
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
    }
  });

  // Load the npm installed tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['sass','watch']);
};
