'use strict';

var Controller_Developer = function () {

    var me = this;

    me.developerUi = null;

    me.developerModel = null;
    me.projectModel = null;

    me.setDeveloperUi = function (developerUi) {
        me.developerUi = developerUi;
        me.developerUi.setDeveloperModel(me.developerModel);
        me.developerUi.setProjectModel(me.projectModel);
    };

    me.setDeveloperModel = function (developerModel) {
        me.developerModel = developerModel;
    };

    me.setProjectModel = function (projectModel) {
        me.projectModel = projectModel;
    };

    me.init = function () {
        // Set model(s)
        me.setDeveloperModel(Model_Developer.getInstance());
        me.setProjectModel(Model_Project.getInstance());
        // Set ui
        me.setDeveloperUi(new Ui_Developer());
        // Add listeners
        me.addListeners();
    };

    me.addListeners = function () {

        // Developer List
        $(document).on('click', 'a[data-page="developer-list"]', function (e) {
            me.developerUi.renderList();
        });

        // Developer Create
        $(document).on('click', 'a[data-page="developer-create"]', function (e) {
            me.developerUi.renderCreate();
        });

        // Developer Edit
        $(document).on('click', 'a[data-page="developer-edit"]', function (e) {
            var developerId = parseInt($(this).data('developer-id'));
            me.developerUi.renderEdit(developerId);
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
            me.developerModel.save(dataObj);
            me.developerUi.renderList();
        });

        // Developer Delete
        $(document).on('click', 'a[data-page="developer-delete"]', function (e) {

            var developerId = parseInt($(this).data('developer-id'));
            bootbox.confirm('Are you sure to delete this developer with all related data?', function (d) {
                if (d) {
                    me.developerModel.delete(developerId);
                    me.developerUi.renderList();
                }
            });
        });

    };

    return me;
};