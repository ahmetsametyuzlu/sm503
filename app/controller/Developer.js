'use strict';

Controller.Developer = function () {

    var me = new Controller.Abstract();

    me.view.developer = null;

    me.model.developer = null;
    me.model.projectList = null;

    me.setDeveloperView = function (developerView) {
        me.view.developer = developerView;
        me.view.developer.setDeveloperModel(me.model.developer);
        me.view.developer.setProjectListModel(me.model.projectList);
    };

    me.setDeveloperModel = function (developerModel) {
        me.model.developer = developerModel;
    };

    me.setProjectListModel = function (projectListModel) {
        me.model.projectList = projectListModel;
    };

    me.init = function () {
        // Set model(s)
        me.setDeveloperModel(Model.DeveloperList.getInstance());
        me.setProjectListModel(Model.ProjectList.getInstance());
        // Set view
        me.setDeveloperView(new View.Developer());
        // Add listeners
        me.addListeners();
    };

    me.addListeners = function () {

        // Developer List
        $(document).on('click', 'a[data-page="developer-list"]', function (e) {
            me.view.developer.renderList();
        });

        // Developer Create
        $(document).on('click', 'a[data-page="developer-create"]', function (e) {
            me.view.developer.renderCreate();
        });

        // Developer Edit
        $(document).on('click', 'a[data-page="developer-edit"]', function (e) {
            var developerId = parseInt($(this).data('developer-id'));
            me.view.developer.renderEdit(developerId);
        });

        // Developer Form Submit
        $(document).on('click', 'button[data-form-action="developer-submit"]', function (e) {

            var form = $(this).closest('form');
            var disabled = form.find("[disabled]");
            disabled.prop('disabled', false);

            var data = form.serializeArray();
            var dataObj = {};
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == 'assignedProjectIds') {
                    if (!dataObj[data[i].name]) {
                        dataObj[data[i].name] = [];
                    }
                    dataObj[data[i].name].push(data[i].value);
                } else {
                    dataObj[data[i].name] = data[i].value;
                }
                if (data[i].value == '') {
                    bootbox.alert('All the fields are required. Fill them! ');
                    disabled.prop('disabled', true);
                    return false;
                }
            }
            me.model.developer.save(dataObj);
            me.view.developer.renderList();
        });

        // Developer Delete
        $(document).on('click', 'a[data-page="developer-delete"]', function (e) {

            var developerId = parseInt($(this).data('developer-id'));
            bootbox.confirm('Are you sure to delete this developer with all related data?', function (d) {
                if (d) {
                    me.model.developer.delete(developerId);
                    me.view.developer.renderList();
                }
            });
        });

    };

    return me;
};