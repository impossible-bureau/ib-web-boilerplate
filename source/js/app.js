require('raf.js');
window.$ = require('jquery');
window._ = require('underscore');


// Quick example
require('controllers/example_controller');
var foo = new example_controller();
foo.render();