module.exports = function( grunt ) {
    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: [
                "Gruntfile.js",
                "toposort.js",
                "test/spec.js"
            ]
        },
        jscs: {
            options: {
                config: ".jscsrc"
            },
            all: "<%= jshint.all %>"
        },
        mochaTest: {
            spec: {
                options: {
                    reporter: "spec",
                    ui: "tdd"
                },
                src: "test/spec.js"
            }
        },
        mocha: {
            normal: {
                options: {
                    run: true
                },
                src: "test/index.html"
            },
            amd: {
                src: "test/amd.html"
            }
        }
    });

    // Copy browser testing stuff
    grunt.file.copy( "node_modules/grunt-mocha/node_modules/mocha/mocha.js", "test/lib/mocha.js" );
    grunt.file.copy( "node_modules/chai/chai.js", "test/lib/chai.js" );
    grunt.file.copy( "node_modules/requirejs/require.js", "test/lib/require.js" );

    // Load dependencies
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-jscs-checker" );
    grunt.loadNpmTasks( "grunt-mocha" );
    grunt.loadNpmTasks( "grunt-mocha-test" );

    grunt.registerTask( "default", [ "jshint", "jscs", "mocha", "mochaTest" ] );
};
