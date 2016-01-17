'use strict';

Controller.Home = function () {

    var me = new Controller.Abstract();

    me.view.home = null;

    me.setHomeView = function (homeView) {
        me.view.home = homeView;
    };

    me.init = function () {
        // Set view
        me.setHomeView(new View.Home());
        // Add listeners
        me.addCatalogeners();
        // Render homepage by default
        me.view.home.render();
    };

    me.addCatalogeners = function () {
        $(document).on('click', 'a[data-page="home"]', function (e) {
            me.view.home.render();
        });
    };

    return me;

};