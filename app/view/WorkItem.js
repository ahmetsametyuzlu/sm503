'use strict';

View.WorkItem = function () {

    var me = new View.Abstract();

    me.model.workItemCatalog = null;

    me.setWorkItemCatalogModel = function (workItemModel) {
        me.model.workItemCatalog = workItemModel;
    };

    me.init = function () {

    };

    me.renderCatalog = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Work Items</h1>';
        if (me.model.workItemCatalog.workItems.length == 0) {
            me.html += '<div class="jumbotron">';
            me.html += '<p>There is no defined work items. Click the button to create a new one!</p>';
            me.html += '<p><a class="btn btn-success btn-lg" href="#" data-page="work-item-create"><i class="fa fa-plus"></i> Create New Work Item</a></p>';
            me.html += '</div>';
        } else {
            me.html += '<div class="create-work-item-button"><a class="btn btn-success btn-sm" href="#" data-page="work-item-create"><i class="fa fa-plus"></i> Create New Work Item</a></div>';
            me.html += '<table class="table table-bordered table-striped table-hover">';
            me.html += '<thead>';
            me.html += '    <tr>';
            me.html += '        <th width="5%">Id</th>';
            me.html += '        <th width="85%">Title</th>';
            me.html += '        <th width="10%" class="text-center">Actions</th>';
            me.html += '    </tr>';
            me.html += '</thead>';
            me.html += '<tbody>';
            for (var i = 0; i < me.model.workItemCatalog.workItems.length; i++) {
                me.html += '    <tr>';
                me.html += '        <td>#' + me.model.workItemCatalog.workItems[i].workItemId + '</td>';
                me.html += '        <td>' + me.model.workItemCatalog.workItems[i].name + '</td>';
                me.html += '        <td class="text-center">';
                me.html += '            <a href="#" class="btn btn-danger btn-xs" data-page="work-item-delete" data-work-item-id="' + me.model.workItemCatalog.workItems[i].workItemId + '"><i class="fa fa-minus-square"></i></a>';
                me.html += '            <a href="#" class="btn btn-success btn-xs" data-page="work-item-edit" data-work-item-id="' + me.model.workItemCatalog.workItems[i].workItemId + '"><i class="fa fa-edit"></i></a>';
                me.html += '        </td>';
                me.html += '    </tr>';
            }
            me.html += '</tbody>';
            me.html += '</table>';
        }

        me.clear();
        me.page.html(me.html);
    };

    me.form = function () {
        me.html += '<form id="workItem-form">';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Work Item Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">#</span>';
        me.html += '            <input name="workItemId" type="number" class="form-control">';
        me.html += '        </div>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Name</label>';
        me.html += '        <input name="name" type="text" class="form-control" required>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Description</label>';
        me.html += '        <textarea name="description" class="form-control" required rows="4"></textarea>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Priority</label>';
        me.html += '        <select name="priority" class="form-control"><option>High</option><option>Middle</option><option>Low</option></select>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Status</label>';
        me.html += '        <select name="status" class="form-control"><option>Planned</option><option>Not Planned</option><option>Completed</option><option>On-going</option></select>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Estimated effort</label>';
        me.html += '        <input name="estimatedEffort" type="text" class="form-control" required>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <div class="row">';
        me.html += '            <div class="col-sm-6">';
        me.html += '                <label>Planned Start Date</label>';
        me.html += '                <input name="plannedStartDate" type="date" class="form-control" required>';
        me.html += '            </div>';
        me.html += '            <div class="col-sm-6">';
        me.html += '                <label>Planned Completion Date</label>';
        me.html += '                <input name="plannedCompletionDate" type="date" class="form-control" required>';
        me.html += '            </div>';
        me.html += '        </div>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Predecessor work item(s)</label>';
        for (var i = 0; i < me.model.workItemCatalog.workItems.length; i++) {
            me.html += '    <div class="checkbox"><label><input type="checkbox" name="predecessorWorkItem" value="' + me.model.workItemCatalog.workItems[i].workItemId + '"> ' + me.model.workItemCatalog.workItems[i].name + '</label></div>';
        }
        me.html += '    </div>';
        me.html += '    <button type="button" data-form-action="work-item-submit" class="btn btn-success"><i class="fa fa-save"></i> Submit</button>';
        me.html += '</form>';
    };

    me.renderEdit = function (workItemId) {
        me.html = '';
        me.html += '<h1 class="main-title">Work Item Edit</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var workItem = me.model.workItemCatalog.get(workItemId);
        var input = {
            workItemId: $("[name=workItemId]"),
            name: $("[name=name]"),
            description: $("[name=description]"),
            status: $("[name=status]"),
            priority: $("[name=priority]"),
            predecessorWorkItem: $("[name=predecessorWorkItem]"),
            estimatedEffort: $("[name=estimatedEffort]"),
            plannedStartDate: $("[name=plannedStartDate]"),
            plannedCompletionDate: $("[name=plannedCompletionDate]"),
        };
        input.workItemId.prop('disabled', true);
        input.workItemId.val(workItem.workItemId);
        input.name.val(workItem.name);
        input.description.val(workItem.description);
        input.status.val(workItem.status);
        input.priority.val(workItem.priority);
        input.predecessorWorkItem.val(workItem.predecessorWorkItem);
        input.estimatedEffort.val(workItem.estimatedEffort);
        input.plannedStartDate.val(workItem.plannedStartDate.toJSON().slice(0, 10));
        input.plannedCompletionDate.val(workItem.plannedCompletionDate.toJSON().slice(0, 10));

        for (var i = 0; i < me.workItemCatalog.workItems.predecessorWorkItem.length; i++) {
            $("[name=predecessorWorkItem][value=" + String(me.workItemCatalog.workItems.predecessorWorkItem[i].workItemId) + "]").prop('checked', true);
        }
    };

    me.renderCreate = function (projectId) {
        me.html = '';
        me.html += '<h1 class="main-title">Work Item Create</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        $("[name=workItemId]").change(function () {
            var workItemId = parseInt($(this).val());
            if (me.model.workItemCatalog.getIndex(workItemId) !== false) {
                bootbox.alert('There is already a defined work item in the system with this work item id #' + String(workItemId) + '. ');
                $("[name=workItemId]").val('');
            }
        });
    };

    return me;

};