/*
@Class ComponentLoader
Initializes and manages access to all components.
To attach a component to an element:
- Include COMPONENT_CLASS on the context element.
- Set the component's name in the data-component attribute.
- Register the class name/object with the register method after the class definition.
- Be sure the component implements an init method.
(see ib.ComponentExample.js for a example/starting point for all this).
*/


(function() {
  ib.ComponentLoader = (function() {
    var COMPONENT_ATTRIBUTE, COMPONENT_CLASS, instances, instancesByType, registeredClasses, registeredElements;

    function ComponentLoader() {}

    registeredClasses = [];

    instancesByType = [];

    instances = [];

    registeredElements = [];

    COMPONENT_CLASS = 'ib-component';

    COMPONENT_ATTRIBUTE = 'component';

    /*
    Finds, initializes, and stores components with registered classes.
    @param {jQuery.Element} $context - The element to load components from.
    */


    ComponentLoader.init = function($context) {
      $context = $context || $('body');
      return $('.' + COMPONENT_CLASS, $context).each(function(index) {
        var $el, component, id, type;
        if ($.inArray(this, registeredElements) !== -1) {
          return -1;
        }
        registeredElements.push(this);
        component = null;
        type = $(this).data(COMPONENT_ATTRIBUTE);
        id = null;
        $el = $(this);
        if (typeof registeredClasses[type] !== 'undefined') {
          component = new registeredClasses[type]($(this));
          if (typeof $el.data('id') !== 'undefined') {
            id = $el.data('id');
          } else {
            id = COMPONENT_CLASS + Math.floor(Math.random() * 100000) + '' + index;
            $el.data('id', id);
          }
          component.id = id;
          instances[id] = component;
          if (typeof instancesByType[type] === 'undefined') {
            instancesByType[type] = [component];
          } else {
            instancesByType[type].push(component);
          }
          component.init();
        }
      });
    };

    /*
    Registers a component so it can be initialized on page load.
    @param {String} name - the full class name (e.g. namespace.Classname)
    @param {Object} component - the class object itself.
    */


    ComponentLoader.register = function(name, component) {
      registeredClasses[name] = component;
    };

    /*
    Returns an instance basd on its id.
    @param  {String} id - The id associated with the component from the data-id attribute in the markup.
    @return {Object} - The instance or null.
    */


    ComponentLoader.findInstanceById = function(id) {
      return instances[id];
    };

    /*
    Returns instances of a given type.
    @param  {String} type - The component's name (e.g. ib.ComponentName).
    @return {Array} - All instances found or an empty array.
    */


    ComponentLoader.findInstancesByType = function(type) {
      var result;
      result = instancesByType[type];
      if (result === null) {
        result = [];
      }
      return result;
    };

    return ComponentLoader;

  })();

}).call(this);
