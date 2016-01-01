'use strict';

Controller.Home = function () {

    var me = Controller.Abstract();

    me.setModel = function (modelName, modelObj) {
        me.model[modelName] = modelObj;
    };

    me.view.home = null;

    me.setHomeView = function (homeView) {
        me.view.home = homeView;
    };

    me.init = function () {
        // Set view
        me.setHomeView(new View.Home());
        // Add listeners
        me.addListeners();
        // Render homepage by default
        me.view.home.render();
    };

    me.addListeners = function () {
        $(document).on('click', 'a[data-page="home"]', function (e) {
            me.view.home.render();
        });
    };

    return me;

};