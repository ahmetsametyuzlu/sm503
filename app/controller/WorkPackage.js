'use strict';

Controller.WorkPackage = function () {

    var me = Controller.Abstract();

    me.view.project = null;

    me.projectModel = null;

    me.setProjectView = function (projectView) {
        me.view.project = projectView;
        me.view.project.setProjectModel(me.projectModel);
    };

    me.setProjectModel = function (projectModel) {
        me.projectModel = projectModel;
    };

    me.init = function () {
        // Set model(s)
        me.setProjectModel(Model.Project.getInstance());
        // Set view
        me.setProjectView(new View.Project());
        // Add listeners
        me.addListeners();
    };

    me.addListeners = function () {
        // Project List
        $(document).on('click', 'a[data-page="project-list"]', function (e) {
            me.view.project.renderList();
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
            me.projectModel.save(dataObj);

            me.view.project.renderList();
        });

        // Project Delete
        $(document).on('click', 'a[data-page="project-delete"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            bootbox.confirm('Are you sure to delete this project with all related data?', function (d) {
                if (d) {
                    me.projectModel.delete(projectId);
                    me.view.project.renderList();
                }
            });
        });
    };

    return me;

};