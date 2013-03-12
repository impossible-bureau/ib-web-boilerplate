/*! Copyright (c) 2013 Impossible Bureau (http://www.impossible-bureau.com) Licensed under the MIT License (LICENSE.txt). */

var ib = ib || {};

/**
* @Class ComponentLoader
* Initializes and manages access to all components.
* To attach a component to an element:
* - Include COMPONENT_CLASS on the context element.
* - Set the component's name in the data-component attribute.
* - Register the class name/object with the register method after the class definition.
* - Be sure the component implements an init method.
* (see ib.ComponentExample.js for a example/starting point for all this).
*/
ib.ComponentLoader = (function() {

    var registeredClasses = [];
    var instancesByType = [];
    var instances = [];
    var registeredElements = [];

    // Class name that indicates which DOM elements need to initialize a component.
    var COMPONENT_CLASS = 'ib-component';

    // Data attribute the contains the component name.
    var COMPONENT_ATTRIBUTE = 'component';

    /**
    * Finds, initializes, and stores components with registered classes.
    * @param {jQuery.Element} $context - The element to load components from.
    */
    function init($context) {
        $context = $context || $('body');

        $('.' + COMPONENT_CLASS, $context).each(function(index) {
            if ($.inArray(this, registeredElements) !== -1) {
                return -1;
            }
            registeredElements.push(this);

            var component = null,
                type = $(this).data(COMPONENT_ATTRIBUTE),
                id = null;
                $el = $(this);

            if (registeredClasses[type] !== undefined) {
                component = new registeredClasses[type]($(this));
                if ($el.data('id')) {
                    id = $el.data('id');
                } else {
                    id = COMPONENT_CLASS + Math.floor(Math.random() * 100000) + '' + index;
                }

                component.id = id;
                instances[id] = component;
                if (typeof(instancesByType[type]) === 'undefined') {
                    instancesByType[type] = [component];
                } else {
                    instancesByType[type].push(component);
                }
                component.init();
            }
        });
    }

    /*
    * Registers a component so it can be initialized on page load.
    * @param {String} name - the full class name (e.g. namespace.Classname)
    * @param {Object} component - the class object itself.
    */
    function register(name, component) {
        registeredClasses[name] = component;
    }

    /**
     * Returns an instance basd on its id.
     * @param  {String} id - The id associated with the component from the data-id attribute in the markup.
     * @return {Object} - The instance or null.
     */
    function findInstanceById(id) {
        return instances[id];
    }

    /**
     * Returns instances of a given type.
     * @param  {String} type - The component's name (e.g. ib.ComponentName).
     * @return {Array} - All instances found or an empty array.
     */
    function findInstancesByType(type) {
        var result = instancesByType[type];
        if (result === null) {
            result = [];
        }
        return result;
    }


    return {
        init: init,
        register: register,
        findInstanceById: findInstanceById,
        findInstancesByType: findInstancesByType
    };

}());