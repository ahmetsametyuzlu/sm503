'use strict';

Controller.Credit = function () {

    var me = new Controller.Abstract();

    me.view.credit = null;
    me.model.credit = null;

    me.setCreditModel = function (creditModel) {
        me.model.credit = creditModel;
    };

    me.setCreditView = function (creditView) {
        me.view.credit = creditView;
        me.view.credit.setCreditModel(me.model.credit);
    };

    me.init = function () {
        // Set model(s)
        me.setCreditModel(Model.Credit.getInstance());
        // Set view
        me.setCreditView(new View.Credit());
        me.addListeners();
    };

    me.addListeners = function () {
        $(document).on('click', 'a[data-page="credit"]', function (e) {
            me.view.credit.render();
        });
    };

    return me;

};