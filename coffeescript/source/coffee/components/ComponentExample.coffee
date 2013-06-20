###
Example component for use with ib.ComponentLoader.
Corresponding example markup:
<div class="ib-component" data-component="ib.ComponentExample"></div>
###


###
@class ComponentExample
Description.
###

###
@param {Element} $context - the container element for the component elements.
###
class ib.ComponentExample
  constructor: ($context, options) ->
    @$context = $context
    @opts = $.extend({}, options or $context.data())

  init: ->
    context = name: @$context.data("id")
    markup = ib.Templates["sampleTemplate.html"](context)
    @$context.html(markup)
    ###
    If you had additional components to initialize:
    ib.ComponentLoader.init(this.$context);
    ###
    return

ib.ComponentLoader.register "ib.ComponentExample", ib.ComponentExample