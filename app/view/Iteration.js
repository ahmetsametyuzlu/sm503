'use strict';

View.Iteration = function () {

    var me = new View.Abstract();

    me.iterationModel = null;

    me.setIterationModel = function (iterationModel) {
        me.iterationModel = iterationModel;
    };

    me.init = function () {

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