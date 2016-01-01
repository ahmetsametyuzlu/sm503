'use strict';

Controller.Layout = function () {

    var me = Controller.Abstract();

    me.layoutView = null;

    me.model.layout = null;
    me.model.projectList = null;

    me.setLayoutView = function (layoutView) {
        me.layoutView = layoutView;
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
        me.layoutView.render();
    };

    me.addListeners = function () {
        $(document).on('click', 'a[data-page], button[data-form-action]', function (e) {
            me.layoutView.render();
        });
    };

    return me;

};