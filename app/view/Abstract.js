'use strict';

View.Abstract = function () {

    var me = this;

    me.model = {};

    me.html = '';
    me.page = $("#page");

    me.clear = function () {
        me.page.empty();
    };

    return me;

};