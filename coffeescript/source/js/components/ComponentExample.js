/*
Example component for use with ib.ComponentLoader.
Corresponding example markup:
<div class="ib-component" data-component="ib.ComponentExample"></div>
*/


/*
@class ComponentExample
Description.
*/


/*
@param {Element} $context - the container element for the component elements.
*/


(function() {
  ib.ComponentExample = (function() {
    function ComponentExample($context, options) {
      this.$context = $context;
      this.opts = $.extend({}, options || $context.data());
    }

    ComponentExample.prototype.init = function() {
      var context, markup;
      context = {
        name: this.$context.data("id")
      };
      markup = ib.Templates["sampleTemplate.html"](context);
      this.$context.html(markup);
      /*
      If you had additional components to initialize:
      ib.ComponentLoader.init(this.$context);
      */

    };

    return ComponentExample;

  })();

  ib.ComponentLoader.register("ib.ComponentExample", ib.ComponentExample);

}).call(this);
