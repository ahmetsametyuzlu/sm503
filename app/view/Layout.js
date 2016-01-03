'use strict';

View.Layout = function () {

    var me = new View.Abstract();

    me.header = $("header");

    me.model.projectList = null;
    me.model.layout = null;

    me.setProjectListModel = function (projectListModel) {
        me.model.projectList = projectListModel;
    };

    me.setLayoutModel = function (layoutModel) {
        me.model.layout = layoutModel;
    };

    me.render = function () {

        me.html = '';

        if (me.model.layout.activeProjectId !== null) {

            var projectId = me.model.layout.activeProjectId;
            var project = me.model.projectList.get(projectId);

            me.html += '<nav class="navbar navbar-inverse navbar-fixed-top">';
            me.html += '    <div class="container">';
            me.html += '        <div class="navbar-header">';
            me.html += '            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-project" aria-expanded="false" aria-controls="navbar">';
            me.html += '                <span class="sr-only">Toggle navigation</span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '                <span class="icon-bar"></span>';
            me.html += '            </button>';
            me.html += '            <a class="navbar-brand" href="#" data-page="project-detail" data-project-id="' + String(projectId) + '">PMT</a>';
            me.html += '        </div>';
            me.html += '        <div id="navbar-project" class="navbar-collapse collapse">';
            me.html += '            <form class="navbar-form navbar-left">';
            me.html += '                <div class="form-group">';
            me.html += '                    <select class="form-control" id="project-select">';
            for (var i = 0; i < me.model.projectList.projects.length; i++) {
                me.html += '                    <option value="' + me.model.projectList.projects[i].projectId + '">' + me.model.projectList.projects[i].name + '</option>';
            }
            me.html += '                    </select>';
            me.html += '                </div>';
            me.html += '            </form>';
            me.html += '            <ul class="nav navbar-nav">';
            me.html += '                <li><a href="#" data-page="project-detail" data-project-id="' + String(projectId) + '"><i class="fa fa-info-circle"></i> Detail</a></li>';
            me.html += '                <li><a href="#" data-page="project-plan" data-project-id="' + String(projectId) + '"><i class="fa fa-briefcase"></i> Plan</a></li>';
            me.html += '                <li><a href="#" data-page="project-work-item" data-project-id="' + String(projectId) + '"><i class="fa fa-sitemap"></i> Work Item</a></li>';
            me.html += '            </ul>';
            me.html += '            <ul class="nav navbar-nav navbar-right">';
            me.html += '                <li><a href="#" data-page="home"><i class="fa fa-home"></i> Home</a></li>';
            me.html += '                <li><a href="#" data-page="credit">Credits</a></li>';
            me.html += '            </ul>';
            me.html += '        </div>';
            me.html += '    </div>';
            me.html += '</nav>';

            me.header.empty();
            me.header.html(me.html);

            $("#project-select").val(projectId);

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
            me.html += '            <a class="navbar-brand" href="#" data-page="home">PMT</a>';
            me.html += '        </div>';
            me.html += '        <div id="navbar" class="navbar-collapse collapse">';
            me.html += '            <ul class="nav navbar-nav">';
            me.html += '                <li><a href="#" data-page="project-list"><i class="fa fa-briefcase"></i> Projects</a></li>';
            me.html += '                <li><a href="#" data-page="developer-list"><i class="fa fa-users"></i> Developers</a></li>';
            me.html += '            </ul>';
            me.html += '            <ul class="nav navbar-nav navbar-right">';
            me.html += '                <li><a href="#" data-page="home"><i class="fa fa-home"></i> Home</a></li>';
            me.html += '                <li><a href="#" data-page="credit">Credits</a></li>';
            me.html += '            </ul>';
            me.html += '        </div>';
            me.html += '    </div>';
            me.html += '</nav>';

            me.header.empty();
            me.header.html(me.html);
        }

    };

    return me;

};

