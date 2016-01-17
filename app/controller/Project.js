'use strict';

Controller.Project = function () {

    var me = new Controller.Abstract();

    me.view.project = null;

    me.model.projectCatalog = null;
    me.model.phaseCatalog = null;
    me.model.iterationCatalog = null;
    me.model.workItemCatalog = null;

    me.setProjectView = function (projectView) {
        projectView.setProjectCatalogModel(me.model.projectCatalog);
        projectView.setPhaseCatalogModel(me.model.phaseCatalog);
        projectView.setIterationCatalogModel(me.model.iterationCatalog);
        projectView.setWorkItemCatalogModel(me.model.workItemCatalog);
        me.view.project = projectView;
    };

    me.setProjectCatalogModel = function (projectCatalogModel) {
        me.model.projectCatalog = projectCatalogModel;
    };

    me.setPhaseCatalogModel = function (phaseCatalogModel) {
        me.model.phaseCatalog = phaseCatalogModel;
    };

    me.setIterationCatalogModel = function (iterationCatalogModel) {
        me.model.iterationCatalog = iterationCatalogModel;
    };

    me.setWorkItemCatalogModel = function (workItemCatalogModel) {
        me.model.workItemCatalog = workItemCatalogModel;
    };

    me.init = function () {
        // Set model(s)
        me.setProjectCatalogModel(Model.ProjectCatalog.getInstance());
        me.setPhaseCatalogModel(Model.PhaseCatalog.getInstance());
        me.setIterationCatalogModel(Model.IterationCatalog.getInstance());
        me.setWorkItemCatalogModel(Model.WorkItemCatalog.getInstance());
        // Set view
        me.setProjectView(new View.Project());
        // Add listeners
        me.addCatalogeners();
    };

    me.addCatalogeners = function () {
        // Project Catalog
        $(document).on('click', 'a[data-page="project-list"]', function (e) {
            me.view.project.renderCatalog();
        });

        // Project Create
        $(document).on('click', 'a[data-page="project-create"]', function (e) {
            me.view.project.renderCreate();
        });

        // Project Edit
        $(document).on('click', 'a[data-page="project-edit"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.project.renderEdit(projectId);
        });

        // Project Detail
        $(document).on('click', 'a[data-page="project-detail"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.project.renderDetail(projectId);
        });

        // Project Plan
        $(document).on('click', 'a[data-page="project-plan"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.project.renderPlan(projectId);
        });

        // Project Form Submit
        $(document).on('click', 'button[data-form-action="project-submit"]', function (e) {
            var form = $(this).closest('form');
            var disabled = form.find("[disabled]");
            disabled.prop('disabled', false);

            var data = form.serializeArray();
            var dataObj = {};
            for (var i = 0; i < data.length; i++) {
                dataObj[data[i].name] = data[i].value;
                if (data[i].value == '') {
                    bootbox.alert('All the fields are required. Fill them! ');
                    disabled.prop('disabled', true);
                    return false;
                }
            }

            if (me.model.projectCatalog.getIndex(dataObj.projectId) !== false) {
                me.model.projectCatalog.update(dataObj.projectId, dataObj);
            } else {
                me.model.projectCatalog.create(dataObj);
                me.model.phaseCatalog.generateForProject(dataObj.projectId);
                me.model.iterationCatalog.generateForPhases(me.model.phaseCatalog.getCatalogByProjectId(dataObj.projectId));
            }

            me.view.project.renderCatalog();
        });

        // Project Delete
        $(document).on('click', 'a[data-page="project-delete"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            bootbox.confirm('Are you sure to delete this project with all related data?', function (d) {
                if (d) {
                    me.model.projectCatalog.delete(projectId);
                    me.view.project.renderCatalog();
                }
            });
        });
    };

    return me;

};