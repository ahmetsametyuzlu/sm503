'use strict';

Controller.Developer = function () {

    var me = new Controller.Abstract();

    me.view.developer = null;

    me.model.developerCatalog = null;
    me.model.projectCatalog = null;

    me.setDeveloperView = function (developerView) {
        me.view.developer = developerView;
        me.view.developer.setDeveloperModel(me.model.developerCatalog);
        me.view.developer.setProjectCatalogModel(me.model.projectCatalog);
    };

    me.setDeveloperModel = function (developerModel) {
        me.model.developerCatalog = developerModel;
    };

    me.setProjectCatalogModel = function (projectCatalogModel) {
        me.model.projectCatalog = projectCatalogModel;
    };

    me.init = function () {
        // Set model(s)
        me.setDeveloperModel(Model.DeveloperCatalog.getInstance());
        me.setProjectCatalogModel(Model.ProjectCatalog.getInstance());
        // Set view
        me.setDeveloperView(new View.Developer());
        // Add listeners
        me.addCatalogeners();
    };

    me.addCatalogeners = function () {

        // Developer Catalog
        $(document).on('click', 'a[data-page="developer-list"]', function (e) {
            me.view.developer.renderCatalog();
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
            me.model.developerCatalog.save(dataObj);
            me.view.developer.renderCatalog();
        });

        // Developer Delete
        $(document).on('click', 'a[data-page="developer-delete"]', function (e) {

            var developerId = parseInt($(this).data('developer-id'));
            bootbox.confirm('Are you sure to delete this developer with all related data?', function (d) {
                if (d) {
                    me.model.developerCatalog.delete(developerId);
                    me.view.developer.renderCatalog();
                }
            });
        });

    };

    return me;
};