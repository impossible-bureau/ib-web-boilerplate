###
@Class ComponentLoader
Initializes and manages access to all components.
To attach a component to an element:
- Include COMPONENT_CLASS on the context element.
- Set the component's name in the data-component attribute.
- Register the class name/object with the register method after the class definition.
- Be sure the component implements an init method.
(see ib.ComponentExample.js for a example/starting point for all this).
###
class ib.ComponentLoader
  registeredClasses = []
  instancesByType = []
  instances = []
  registeredElements = []
  COMPONENT_CLASS = 'ib-component'
  COMPONENT_ATTRIBUTE = 'component'

  # Class name that indicates which DOM elements need to initialize a component.

  # Data attribute the contains the component name.

  ###
  Finds, initializes, and stores components with registered classes.
  @param {jQuery.Element} context - The element to load components from.
  ###
  @init: (initContext) ->
    context = initContext or $('body')
    $('.' + COMPONENT_CLASS, context).each (index) ->
      return -1  if $.inArray(this, registeredElements) isnt -1
      registeredElements.push(this)
      component = null
      type = $(this).data(COMPONENT_ATTRIBUTE)
      id = null
      el = $(this)
      if typeof registeredClasses[type] isnt 'undefined'
        component = new registeredClasses[type]($(this))
        if typeof el.data('id') isnt 'undefined'
          id = el.data('id')
        else
          id = COMPONENT_CLASS + Math.floor(Math.random() * 100000) + '' + index
          el.data('id', id)
        component.id = id
        instances[id] = component
        if typeof (instancesByType[type]) is 'undefined'
          instancesByType[type] = [component]
        else
          instancesByType[type].push(component)
        component.init()


  ###
  Registers a component so it can be initialized on page load.
  @param {String} name - the full class name (e.g. namespace.Classname)
  @param {Object} component - the class object itself.
  ###
  @register: (name, component) ->
    registeredClasses[name] = component

  ###
  Returns an instance basd on its id.
  @param  {String} id - The id associated with the component from the data-id attribute in the markup.
  @return {Object} - The instance or null.
  ###
  @findInstanceById: (id) ->
    instances[id]

  ###
  Returns instances of a given type.
  @param  {String} type - The component's name (e.g. ib.ComponentName).
  @return {Array} - All instances found or an empty array.
  ###
  @findInstancesByType: (type) ->
    result = instancesByType[type]
    result = [] if result is null
    result
