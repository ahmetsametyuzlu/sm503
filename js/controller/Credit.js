'use strict';

var Controller_Credit = function () {

    var me = this;

    me.creditUi = null;

    me.creditModel = null;

    me.setCreditModel = function (creditModel) {
        me.creditModel = creditModel;
    };

    me.setCreditUi = function (creditUi) {
        me.creditUi = creditUi;
        me.creditUi.setCreditModel(me.creditModel);
    };

    me.init = function () {
        // Set model(s)
        me.setCreditModel(Model_Credit.getInstance());
        // Set ui
        me.setCreditUi(new Ui_Credit());
        me.addListeners();
    };

    me.addListeners = function () {
        $(document).on('click', 'a[data-page="credit"]', function (e) {
            me.creditUi.render();
        });
    };

    return me;

};