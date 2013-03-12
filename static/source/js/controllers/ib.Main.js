var ib = ib || {};

ib.Main = (function() {

    function init() {
        console.log('Main initialized');
        ib.ComponentLoader.init();
    }


    return {
        init: init
    };

}());
