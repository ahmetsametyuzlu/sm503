'use strict';

var Ui_Credit = function () {

    var me = new Ui_Abstract();

    me.creditModel = null;

    me.setCreditModel = function (creditModel) {
        me.creditModel = creditModel;
    };

    me.init = function () {

    };

    me.render = function () {

        me.html = '';
        me.html += '<h1 class="main-title">Credits</h1>';
        me.html += '<h3>Engineers</h3>';
        me.html += '<ul>';
        for (var i = 0; i < me.creditModel.developers.length; i++) {
            me.html += '<li>' + me.creditModel.developers[i] + '</li>';
        }
        me.html += '</ul>';
        me.html += '<h3>Dependencies</h3>';
        me.html += '<ul>';
        for (var i = 0; i < me.creditModel.plugins.length; i++) {
            me.html += '<li>';
            me.html += '<h4>' + me.creditModel.plugins[i].name + ' <a href="' + me.creditModel.plugins[i].url + '" target="_blank"><i class="fa fa-anchor"></i></a></h4>';
            me.html += '<p>' + me.creditModel.plugins[i].usage + '</p>';
            me.html += '</li>';
        }
        me.html += '</ul>';

        me.page.empty();
        me.page.html(me.html);

    };

    return me;

};