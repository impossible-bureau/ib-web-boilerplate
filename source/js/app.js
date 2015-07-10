require('raf.js');
window.$ = require('jquery');
window._ = require('underscore');
window.ib = {};


// Quick example
require('controllers/example_controller');
var foo = new example_controller();
foo.render();