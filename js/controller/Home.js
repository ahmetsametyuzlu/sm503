'use strict';

Controller.Home = function () {

    var me = this;

    me.homeUi = null;

    me.setHomeUi = function (homeUi) {
        me.homeUi = homeUi;
    };

    me.init = function () {
        // Set ui
        me.setHomeUi(new View.Home());
        // Add listeners
        me.addListeners();
        // Render homepage by default
        me.homeUi.render();
    };

    me.addListeners = function () {
        $(document).on('click', 'a[data-page="home"]', function (e) {
            me.homeUi.render();
        });
    };

    return me;

};