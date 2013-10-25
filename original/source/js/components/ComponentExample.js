/**
 * Example component for use with ib.ComponentLoader.
 * Corresponding example markup:
 * <div class="ib-component" data-component="ib.ComponentExample"></div>
 */

var ib = ib || {};

/**
 * @class ComponentExample
 * Description.
 */

/**
 * @param {Element} $context - the container element for the component elements.
 */
ib.ComponentExample = function(context, options) {
  this.context = context;

  this.opts = $.extend({
  }, options || context.data());
};


ib.ComponentExample.prototype = {
  init: function() {
    var templateContext = {'name': this.context.data('id')};
    var markup = ib.Templates['sampleTemplate.html'](templateContext);
    this.context.html(markup);

    /**
     * If you had additional components to initialize:
     * ib.ComponentLoader.init(this.$context);
     */
  }
};

ib.ComponentLoader.register('ib.ComponentExample', ib.ComponentExample);