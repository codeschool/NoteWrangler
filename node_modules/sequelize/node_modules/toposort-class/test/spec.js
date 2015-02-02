"use strict";

!function( suiteSetup ) {
    if ( typeof define === "function" && define.amd ) {
        define( [ "../toposort", "./lib/chai" ], suiteSetup );
    } else {
        suiteSetup();
    }
}(function( Toposort, chai ) {
    var expect = chai ? chai.expect : null;

    suite( "Toposort", function() {
        if ( !Toposort ) {
            // Deal with browser/Node environments, if AMD support isn't available
            if ( typeof window !== "undefined" ) {
                expect = window.chai.expect;
                Toposort = window.Toposort;
            } else {
                expect = require( "chai" ).expect;
                Toposort = require( ".." );
            }
        }

        test( "should sort correctly", function() {
            var arr, fails, possibilities;
            var t = new Toposort();

            t.add( "3", "2" )
             .add( "2", "1" )
             .add( "6", "5" )
             .add( "5", [ "2", "4" ] );

            arr = t.sort();
            fails = [];

            expect( arr ).to.be.an( "array" );

            possibilities = [
                [ "3", "6", "5", "4", "2", "1" ],
                [ "3", "6", "5", "2", "4", "1" ],
                [ "6", "3", "5", "2", "4", "1" ],
                [ "6", "3", "5", "2", "1", "4" ],
                [ "6", "5", "3", "2", "1", "4" ],
                [ "6", "5", "3", "2", "4", "1" ],
                [ "6", "5", "4", "3", "2", "1" ]
            ];

            possibilities.forEach(function( possibility ) {
                try {
                    expect( arr ).to.deep.equal( possibility );
                } catch ( e ) {
                    fails.push( e );
                }
            });

            if ( fails.length === possibilities.length ) {
                throw fails[ 0 ];
            }
        });

        test( "should find cyclic dependencies", function() {
            var t = new Toposort();
            t.add( "3", "2" )
             .add( "2", "1" )
             .add( "1", "3" );

            expect( function() { t.sort(); }).to.throw( Error );
        });

        test( "#2 - should add the item if an empty array of dependencies is passed", function() {
            var t = new Toposort();
            var out = t.add( "1", [] ).sort();

            expect( out ).to.deep.equal([ "1" ]);
        });
    });
});