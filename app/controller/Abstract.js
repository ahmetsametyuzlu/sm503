'use strict';

Controller.Abstract = function () {

    var me = this;

    me.view = {};
    me.model = {};

    me.setView = function (viewName, viewObj) {
        me.view[viewName] = viewObj;
    };

    me.setModel = function (modelName, modelObj) {
        me.model[modelName] = modelObj;
    };

    return me;

};