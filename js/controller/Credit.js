'use strict';

Controller.Credit = function () {

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
        me.setCreditModel(Model.Credit.getInstance());
        // Set ui
        me.setCreditUi(new View.Credit());
        me.addListeners();
    };

    me.addListeners = function () {
        $(document).on('click', 'a[data-page="credit"]', function (e) {
            me.creditUi.render();
        });
    };

    return me;

};