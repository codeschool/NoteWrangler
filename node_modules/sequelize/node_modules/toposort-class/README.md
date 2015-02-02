# Toposort [![Build Status](https://travis-ci.org/gustavohenke/toposort.png?branch=master)](https://travis-ci.org/gustavohenke/toposort) [![Dependency Status](https://gemnasium.com/gustavohenke/toposort.png)](https://gemnasium.com/gustavohenke/toposort)
__Sorting directed acyclic graphs, for Node.js and  the browser__
_This was originally done by Marcel Klehr. [Why not checkout his original repo?](https://github.com/marcelklehr/toposort)_

## Installation
There are a few ways for installing Toposort. Here are them:

* Via NPM: `npm install toposort-class`
* Via Bower: `bower install toposort`
* Via Git: `git clone git://github.com/gustavohenke/toposort.git`
* [Direct download](https://raw.github.com/gustavohenke/toposort/master/toposort.js) for use in the browser

## Example
Let's say you have the following dependency graph:

* Plugin depends on Backbone and jQuery UI Button;
* Backbone depends on jQuery and Underscore;
* jQuery UI Button depends on jQuery UI Core and jQuery UI Widget;
* jQuery UI Widget and jQuery UI Core depend on jQuery;
* jQuery and Underscore don't depend on anyone.

Now, how would you sort this in a way that each asset will be correctly placed? You'll probably need the following sorting:

* `jQuery`, `jQuery UI Core`, `jQuery UI Widget`, `jQuery UI Button`, `Underscore`, `Backbone`, `Plugin`

You can achieve it with the following code, using `toposort-class`:
```javascript
var Toposort = require('toposort-class'),
	t = new Toposort();

t.add("jquery-ui-core", "jquery")
 .add("jquery-ui-widget", "jquery")
 .add("jquery-ui-button", ["jquery-ui-core", "jquery-ui-widget"])
 .add("plugin", ["backbone", "jquery-ui-button"])
 .add("backbone", ["underscore", "jquery"]);

console.log(t.sort().reverse());

/* Will output:
 * ['jquery', 'jquery-ui-core', 'jquery-ui-widget', 'jquery-ui-button', 'underscore', 'backbone', 'plugin']
 *
 * And you're done.
 */
```

## API
First of all:
```javascript
var Toposort = require('toposort-class'),
	t = new Toposort();

// If you prefer, you can do this way also:
t = new require('toposort-class').Toposort();
```

### .add(item, deps)
* _{String}_ `item` - The name of the dependent item that is being added
* _{Array|String}_ `deps` - A dependency or list of dependencies of `item`

__Returns:__ _{Toposort}_ The Toposort instance, for chaining.

### .sort()
__Returns:__ _{Array}_ The list of dependencies topologically sorted.

This method will check for cyclic dependencies, like "A is dependent of A".

## Legal
MIT License
