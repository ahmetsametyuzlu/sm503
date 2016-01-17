'use strict';

Controller.WorkItem = function () {

    var me = new Controller.Abstract();

    me.view.workItem = null;

    me.model.workItemList = null;

    me.setWorkItemView = function (workItemView) {
        me.view.workItem = workItemView;
        me.view.workItem.setWorkItemListModel(me.model.workItemList);
    };

    me.setWorkItemListModel = function (workItemModel) {
        me.model.workItemList = workItemModel;
    };

    me.init = function () {
        // Set model(s)
        me.setWorkItemListModel(Model.WorkItemList.getInstance());
        // Set view
        me.setWorkItemView(new View.WorkItem());
        // Add listeners
        me.addListeners();
    };

    me.addListeners = function () {
        // WorkItem List
        $(document).on('click', 'a[data-page="work-item-list"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.workItem.renderList(projectId);
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

            me.model.workItemList.save(dataObj);

            me.view.workItem.renderList();
        });

        // WorkItem Delete
        $(document).on('click', 'a[data-page="work-item-delete"]', function (e) {
            var workItemId = parseInt($(this).data('work-item-id'));
            bootbox.confirm('Are you sure to delete this work item with all related data?', function (d) {
                if (d) {
                    me.model.workItemList.delete(workItemId);
                    me.view.workItem.renderList();
                }
            });
        });
    };

    return me;

};