example_controller = function() {
  this.template = require('example.html');
};

example_controller.prototype.render = function() {
  var markup = this.template({adjective: 'Great'});
  $('#main').append(markup);
};

module.exports = example_controller;
