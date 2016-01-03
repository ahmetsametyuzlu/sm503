'use strict';

View.WorkItem = function () {

    var me = new View.Abstract();

    me.model.workItem = null;

    me.setWorkItemModel = function (workItemModel) {
        me.model.workItem = workItemModel;
    };

    me.init = function () {

    };

    me.renderList = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Work Items</h1>';
        me.html += '<p>Under construction. </p>';
        //if (me.model.workItem.workItems.length == 0) {
        //    me.html += '<div class="jumbotron">';
        //    me.html += '<p>There is no defined work items. Click the button to create a new one!</p>';
        //    me.html += '<p><a class="btn btn-success btn-lg" href="#" data-page="workItem-create"><i class="fa fa-plus"></i> Create New Work Item</a></p>';
        //    me.html += '</div>';
        //} else {
        //    me.html += '<div class="create-workItem-button"><a class="btn btn-success btn-sm" href="#" data-page="workItem-create"><i class="fa fa-plus"></i> Create New WorkItem</a></div>';
        //    me.html += '<table class="table table-bordered table-striped table-hover">';
        //    me.html += '<thead>';
        //    me.html += '    <tr>';
        //    me.html += '        <th width="5%">Id</th>';
        //    me.html += '        <th width="85%">Title</th>';
        //    me.html += '        <th width="10%" class="text-center">Actions</th>';
        //    me.html += '    </tr>';
        //    me.html += '</thead>';
        //    me.html += '<tbody>';
        //    for (var i = 0; i < me.model.workItem.workItems.length; i++) {
        //        me.html += '    <tr>';
        //        me.html += '        <td>#' + me.model.workItem.workItems[i].workItemId + '</td>';
        //        me.html += '        <td>' + me.model.workItem.workItems[i].name + '</td>';
        //        me.html += '        <td class="text-center">';
        //        me.html += '            <a href="#" class="btn btn-danger btn-xs" data-page="workItem-delete" data-workItem-id="' + me.model.workItem.workItems[i].workItemId + '"><i class="fa fa-minus-square"></i></a>';
        //        me.html += '            <a href="#" class="btn btn-success btn-xs" data-page="workItem-edit" data-workItem-id="' + me.model.workItem.workItems[i].workItemId + '"><i class="fa fa-edit"></i></a>';
        //        me.html += '        </td>';
        //        me.html += '    </tr>';
        //    }
        //    me.html += '</tbody>';
        //    me.html += '</table>';
        //}

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
        me.html += '        <div class="row">';
        me.html += '            <div class="col-sm-6">';
        me.html += '                <label>Determined Budget</label>';
        me.html += '                <div class="input-group">';
        me.html += '                    <span class="input-group-addon">$</span>';
        me.html += '                    <input name="determinedBudged" type="number" class="form-control">';
        me.html += '                    <span class="input-group-addon">.00</span>';
        me.html += '                </div>';
        me.html += '            </div>';
        me.html += '            <div class="col-sm-6">';
        me.html += '                <label>Estimated Cost</label>';
        me.html += '                <div class="input-group">';
        me.html += '                    <span class="input-group-addon">$</span>';
        me.html += '                    <input name="estimatedCost" type="number" class="form-control">';
        me.html += '                    <span class="input-group-addon">.00</span>';
        me.html += '                </div>';
        me.html += '            </div>';
        me.html += '        </div>';
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
        me.html += '    <button type="button" data-form-action="workItem-submit" class="btn btn-success"><i class="fa fa-save"></i> Submit</button>';
        me.html += '</form>';
    };

    me.renderEdit = function (workItemId) {
        me.html = '';
        me.html += '<h1 class="main-title">Work Item Edit</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var workItem = me.model.workItem.get(workItemId);
        var input = {
            workItemId: $("[name=workItemId]"),
            name: $("[name=name]"),
            description: $("[name=description]"),
            determinedBudged: $("[name=determinedBudged]"),
            estimatedCost: $("[name=estimatedCost]"),
            plannedStartDate: $("[name=plannedStartDate]"),
            plannedCompletionDate: $("[name=plannedCompletionDate]"),
        };
        input.workItemId.prop('disabled', true);
        input.workItemId.val(workItem.workItemId);
        input.name.val(workItem.name);
        input.description.val(workItem.description);
        input.determinedBudged.val(workItem.determinedBudged);
        input.estimatedCost.val(workItem.estimatedCost);
        input.plannedStartDate.val(workItem.plannedStartDate.toJSON().slice(0, 10));
        input.plannedCompletionDate.val(workItem.plannedCompletionDate.toJSON().slice(0, 10));
    };

    me.renderCreate = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Work Item Create</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        $("[name=workItemId]").change(function () {
            var workItemId = parseInt($(this).val());
            if (me.model.workItem.getIndex(workItemId) !== false) {
                bootbox.alert('There is already a defined workItem in the system with this workItem id #' + String(workItemId) + '. ');
                $("[name=workItemId]").val('');
            }
        });
    };

    return me;

};