'use strict';

Controller.WorkItem = function () {

    var me = new Controller.Abstract();

    me.view.workItem = null;

    me.model.workItemCatalog = null;

    me.setWorkItemView = function (workItemView) {
        me.view.workItem = workItemView;
        me.view.workItem.setWorkItemCatalogModel(me.model.workItemCatalog);
    };

    me.setWorkItemCatalogModel = function (workItemModel) {
        me.model.workItemCatalog = workItemModel;
    };

    me.init = function () {
        // Set model(s)
        me.setWorkItemCatalogModel(Model.WorkItemCatalog.getInstance());
        // Set view
        me.setWorkItemView(new View.WorkItem());
        // Add listeners
        me.addCatalogeners();
    };

    me.addCatalogeners = function () {
        // WorkItem Catalog
        $(document).on('click', 'a[data-page="work-item-list"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.workItem.renderCatalog(projectId);
        });

        // WorkItem Create
        $(document).on('click', 'a[data-page="work-item-create"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.workItem.renderCreate(projectId);
        });

        // WorkItem Edit
        $(document).on('click', 'a[data-page="work-item-edit"]', function (e) {
            var workItemId = parseInt($(this).data('work-item-id'));
            me.view.workItem.renderEdit(workItemId);
        });

        // WorkItem Form Submit
        $(document).on('click', 'button[data-form-action="work-item-submit"]', function (e) {
            var form = $(this).closest('form');
            var disabled = form.find("[disabled]");
            disabled.prop('disabled', false);

            var data = form.serializeArray();
            var dataObj = {};

            for (var i = 0; i < data.length; i++) {
                if (data[i].name == 'predecessorWorkItem') {
                    if (!dataObj[data[i].name]) {
                        dataObj[data[i].name] = [];
                    }
                    dataObj[data[i].name].push(data[i].value);
                } else {
                    dataObj[data[i].name] = data[i].value;
                }
                if (data[i].value == '' && data[i].name != 'plannedStartDate' && data[i].name != 'plannedCompletionDate') {
                    bootbox.alert('All the fields are required. Fill them! ');
                    disabled.prop('disabled', true);
                    return false;
                }
            }

            me.model.workItemCatalog.save(dataObj);

            me.view.workItem.renderCatalog();
        });

        // WorkItem Delete
        $(document).on('click', 'a[data-page="work-item-delete"]', function (e) {
            var workItemId = parseInt($(this).data('work-item-id'));
            bootbox.confirm('Are you sure to delete this work item with all related data?', function (d) {
                if (d) {
                    me.model.workItemCatalog.delete(workItemId);
                    me.view.workItem.renderCatalog();
                }
            });
        });
    };

    return me;

};