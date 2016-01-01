'use strict';

View.Layout = function () {

    var me = this;

    me.header = $("header");

    me.model.projectList = null;

    me.setProjectModel = function (projectListModel) {
        me.model.projectList = projectListModel;
    };

    me.render = function () {

        me.html = '';

        if (me.model.projectList && me.model.projectList.activeProjectId) {

            me.html += '<nav class="navbar navbar-inverse navbar-fixed-top">';
            me.html += '    <div class="container">';
            me.html += '        <div class="navbar-header">';
            me.html += '            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-project" aria-expanded="false" aria-controls="navbar">';
            me.html += '                <span class="sr-only">Toggle navigation</span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '            </button>';
            me.html += '            <a class="navbar-brand" href="#" data-page="home">SM 503</a>';
            me.html += '        </div>';
            me.html += '        <div id="navbar-project" class="navbar-collapse collapse">';
            me.html += '            <ul class="nav navbar-nav">';
            me.html += '                <li><a href="#" data-page="project-list"><i class="fa fa-info-circle"></i> Project Detail</a></li>';
            me.html += '                <li><a href="#" data-page="developer-list"><i class="fa fa-briefcase"></i> Project Plan</a></li>';
            me.html += '                <li><a href="#" data-page="developer-list"><i class="fa fa-columns"></i> Iterations</a></li>';
            me.html += '                <li><a href="#" data-page="developer-list"><i class="fa fa-sitemap"></i> Work Packages</a></li>';
            me.html += '            </ul>';
            me.html += '            <ul class="nav navbar-nav navbar-right">';
            me.html += '                <li><a href="#" data-page="home"><i class="fa fa-home"></i> Home</a></li>';
            me.html += '                <li><a href="#" data-page="credit">Credits</a></li>';
            me.html += '            </ul>';
            me.html += '        </div>';
            me.html += '    </div>';
            me.html += '</nav>';

        } else {

            me.html += '<nav class="navbar navbar-inverse navbar-fixed-top">';
            me.html += '    <div class="container">';
            me.html += '        <div class="navbar-header">';
            me.html += '            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">';
            me.html += '                <span class="sr-only">Toggle navigation</span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '            </button>';
            me.html += '            <a class="navbar-brand" href="#" data-page="home">SM 503</a>';
            me.html += '        </div>';
            me.html += '        <div id="navbar" class="navbar-collapse collapse">';
            me.html += '            <ul class="nav navbar-nav">';
            me.html += '                <li><a href="#" data-page="home"><i class="fa fa-home"></i> Home</a></li>';
            me.html += '                <li><a href="#" data-page="project-list"><i class="fa fa-briefcase"></i> Projects</a></li>';
            me.html += '                <li><a href="#" data-page="developer-list"><i class="fa fa-users"></i> Developers</a></li>';
            me.html += '            </ul>';
            me.html += '            <ul class="nav navbar-nav navbar-right">';
            me.html += '                <li><a href="#" data-page="credit">Credits</a></li>';
            me.html += '            </ul>';
            me.html += '        </div>';
            me.html += '    </div>';
            me.html += '</nav>';

        }

        me.header.empty();
        me.header.html(me.html);

    };

    return me;

};

