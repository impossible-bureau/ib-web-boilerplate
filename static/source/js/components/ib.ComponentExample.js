/**
 * Example component for use with ib.ComponentLoader.
 * Corresponding example markup:
 * <div class="ib-component" data-component="ib.ClassName"></div>
 */


var ib = ib || {};

/**
 * @class ClassName
 * Description.
 */

/**
 * @param {Element} $context - the container element for the component elements.
 */
ib.ClassName = function($context, options) {
    this.$context = $context;

    this.opts = $.extend({
    }, options || $context.data());
};


ib.ClassName.prototype = {
    init: function() {
        console.log('component ClassName initialized');
    }
};

ib.ComponentLoader.register('ib.ClassName', ib.ClassName);
