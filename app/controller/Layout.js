'use strict';

Controller.Layout = function () {

    var me = new Controller.Abstract();

    me.view.layout = null;

    me.model.layout = null;
    me.model.projectList = null;

    me.setLayoutView = function (layoutView) {
        me.view.layout = layoutView;
    };

    me.setLayoutModel = function (layoutModel) {
        me.model.layout = layoutModel;
    };

    me.setProjectListModel = function (projectListModel) {
        me.model.projectList = projectListModel;
    };

    me.init = function () {
        me.setLayoutView(new View.Layout());
        me.setProjectListModel(Model.ProjectList.getInstance());
        me.setLayoutModel(Model.Layout.getInstance());
        // Add listeners
        me.addListeners();
        // Render layout by default
        me.view.layout.render();
    };

    me.addListeners = function () {
        $(document).on('click', 'a[data-page], button[data-form-action]', function (e) {
            me.view.layout.render();
        });
        $(document).on('click', 'a[data-page="home"]', function (e) {
            if (me.model.activeProjectId !== null) {
                me.model.activeProjectId = null;
                me.view.layout.render();
            }
        });
        $(document).on('click', 'a[data-page="project-edit"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.model.activeProjectId = projectId;
            me.view.layout.render();
        });
    };

    return me;

};