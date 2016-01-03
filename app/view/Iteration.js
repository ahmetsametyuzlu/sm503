'use strict';

View.Iteration = function () {

    var me = new View.Abstract();

    me.iterationModel = null;

    me.setIterationModel = function (iterationModel) {
        me.iterationModel = iterationModel;
    };

    me.init = function () {

    };

    me.renderList = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Iterations</h1>';
        if (me.iterationModel.iterations.length == 0) {
            me.html += '<div class="jumbotron">';
            me.html += '<p>There is no defined iteration. Click the button to create a new one!</p>';
            me.html += '<p><a class="btn btn-success btn-lg" href="#" data-page="iteration-create"><i class="fa fa-plus"></i> Create New Iteration</a></p>';
            me.html += '</div>';
        } else {
            me.html += '<div class="create-iteration-button"><a class="btn btn-success btn-sm" href="#" data-page="iteration-create"><i class="fa fa-plus"></i> Create New Iteration</a></div>';
            me.html += '<table class="table table-bordered table-striped table-hover">';
            me.html += '<thead>';
            me.html += '    <tr>';
            me.html += '        <th width="5%">Id</th>';
            me.html += '        <th width="85%">Title</th>';
            me.html += '        <th width="10%" class="text-center">Actions</th>';
            me.html += '    </tr>';
            me.html += '</thead>';
            me.html += '<tbody>';
            for (var i = 0; i < me.iterationModel.iterations.length; i++) {
                me.html += '    <tr>';
                me.html += '        <td>#' + me.iterationModel.iterations[i].iterationId + '</td>';
                me.html += '        <td>' + me.iterationModel.iterations[i].name + '</td>';
                me.html += '        <td class="text-center">';
                me.html += '            <a href="#" class="btn btn-danger btn-xs" data-page="iteration-delete" data-iteration-id="' + me.iterationModel.iterations[i].iterationId + '"><i class="fa fa-minus-square"></i></a>';
                me.html += '            <a href="#" class="btn btn-success btn-xs" data-page="iteration-edit" data-iteration-id="' + me.iterationModel.iterations[i].iterationId + '"><i class="fa fa-edit"></i></a>';
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
        me.html += '<form id="iteration-form">';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Iteration Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">#</span>';
        me.html += '            <input name="iterationId" type="number" class="form-control">';
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
        me.html += '    <button type="button" data-form-action="iteration-submit" class="btn btn-success"><i class="fa fa-save"></i> Submit</button>';
        me.html += '</form>';
    };

    me.renderEdit = function (iterationId) {
        me.html = '';
        me.html += '<h1 class="main-title">Iteration Edit</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var iteration = me.iterationModel.get(iterationId);
        var input = {
            iterationId: $("[name=iterationId]"),
            name: $("[name=name]"),
            description: $("[name=description]"),
            determinedBudged: $("[name=determinedBudged]"),
            estimatedCost: $("[name=estimatedCost]"),
            plannedStartDate: $("[name=plannedStartDate]"),
            plannedCompletionDate: $("[name=plannedCompletionDate]"),
        };
        input.iterationId.prop('disabled', true);
        input.iterationId.val(iteration.iterationId);
        input.name.val(iteration.name);
        input.description.val(iteration.description);
        input.determinedBudged.val(iteration.determinedBudged);
        input.estimatedCost.val(iteration.estimatedCost);
        input.plannedStartDate.val(iteration.plannedStartDate.toJSON().slice(0, 10));
        input.plannedCompletionDate.val(iteration.plannedCompletionDate.toJSON().slice(0, 10));
    };

    me.renderCreate = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Iteration Create</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        $("[name=iterationId]").change(function () {
            var iterationId = parseInt($(this).val());
            if (me.iterationModel.getIndex(iterationId) !== false) {
                bootbox.alert('There is already a defined iteration in the system with this iteration id #' + String(iterationId) + '. ');
                $("[name=iterationId]").val('');
            }
        });
    };

    return me;

};