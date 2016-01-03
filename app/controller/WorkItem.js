'use strict';

Controller.WorkItem = function () {

    var me = new Controller.Abstract();

    me.view.workItem = null;

    me.model.workItem = null;

    me.setWorkItemView = function (workItemView) {
        me.view.workItem = workItemView;
        me.view.workItem.setWorkItemModel(me.model.workItem);
    };

    me.setWorkItemModel = function (workItemModel) {
        me.model.workItem = workItemModel;
    };

    me.init = function () {
        // Set model(s)
        me.setWorkItemModel(Model.WorkItemList.getInstance());
        // Set view
        me.setWorkItemView(new View.WorkItem());
        // Add listeners
        me.addListeners();
    };

    me.addListeners = function () {
        // WorkItem List
        $(document).on('click', 'a[data-page="work-item-list"]', function (e) {
            me.view.workItem.renderList();
        });

        // WorkItem Create
        $(document).on('click', 'a[data-page="work-item-create"]', function (e) {
            me.view.workItem.renderCreate();
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
                dataObj[data[i].name] = data[i].value;
                if (data[i].value == '') {
                    bootbox.alert('All the fields are required. Fill them! ');
                    disabled.prop('disabled', true);
                    return false;
                }
            }
            me.model.workItem.save(dataObj);

            me.view.workItem.renderList();
        });

        // WorkItem Delete
        $(document).on('click', 'a[data-page="work-item-delete"]', function (e) {
            var workItemId = parseInt($(this).data('work-item-id'));
            bootbox.confirm('Are you sure to delete this workItem with all related data?', function (d) {
                if (d) {
                    me.model.workItem.delete(workItemId);
                    me.view.workItem.renderList();
                }
            });
        });
    };

    return me;

};