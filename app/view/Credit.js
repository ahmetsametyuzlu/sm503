'use strict';

View.Credit = function () {

    var me = new View.Abstract();

    me.model.credit = null;

    me.setCreditModel = function (creditModel) {
        me.model.credit = creditModel;
    };

    me.init = function () {

    };

    me.render = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Credits</h1>';
        me.html += '<h3>Engineers</h3>';
        me.html += '<ul>';
        for (var i = 0; i < me.model.credit.developers.length; i++) {
            me.html += '<li>' + me.model.credit.developers[i] + '</li>';
        }
        me.html += '</ul>';
        me.html += '<h3>Dependencies</h3>';
        me.html += '<ul>';
        for (var i = 0; i < me.model.credit.plugins.length; i++) {
            me.html += '<li>';
            me.html += '<h4>' + me.model.credit.plugins[i].name + ' <a href="' + me.model.credit.plugins[i].url + '" target="_blank"><i class="fa fa-anchor"></i></a></h4>';
            me.html += '<p>' + me.model.credit.plugins[i].usage + '</p>';
            me.html += '</li>';
        }
        me.html += '</ul>';

        me.clear();
        me.page.html(me.html);
    };

    return me;

};