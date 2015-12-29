'use strict';

View.Home = function () {

    var me = new View.Abstract();

    me.init = function () {

    };

    me.render = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Welcome</h1>';
        me.html += '<p>This software is created for SM503 project. </p>';

        me.page.empty();
        me.page.html(me.html);
    };

    return me;

};