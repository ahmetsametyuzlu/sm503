'use strict';

Controller.Layout = function () {

    var me = new Controller.Abstract();

    me.view.layout = null;

    me.model.layout = null;
    me.model.projectCatalog = null;

    me.setLayoutView = function (layoutView) {
        me.view.layout = layoutView;
        me.view.layout.setLayoutModel(me.model.layout);
        me.view.layout.setProjectCatalogModel(me.model.projectCatalog);
    };

    me.setLayoutModel = function (layoutModel) {
        me.model.layout = layoutModel;
    };

    me.setProjectCatalogModel = function (projectCatalogModel) {
        me.model.projectCatalog = projectCatalogModel;
    };

    me.init = function () {
        me.setProjectCatalogModel(Model.ProjectCatalog.getInstance());
        me.setLayoutModel(Model.Layout.getInstance());

        me.setLayoutView(new View.Layout());
        // Add listeners
        me.addCatalogeners();
        // Render layout by default
        me.view.layout.render();
    };

    me.addCatalogeners = function () {
        // When home clicked go into general mode
        $(document).on('click', 'a[data-page="home"]', function (e) {
            if (me.model.layout.activeProjectId !== null) {
                me.model.layout.activeProjectId = null;
                me.view.layout.render();
            }
        });
        // When project detail is clicked go into project mode
        $(document).on('click', 'a[data-page="project-detail"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.model.layout.activeProjectId = projectId;
            me.view.layout.render();
        });
        // When another project is selected go into project mode
        $(document).on('click', 'a[data-page="project-detail"]', function (e) {
            $("#project-select").change(function (e) {
                me.model.layout.activeProjectId = parseInt($(this).val());
                me.view.layout.render();
                // Trigger click event on project detail page.
                $('a[data-page="project-detail"]').first().click();
            });
        });
    };

    return me;

};