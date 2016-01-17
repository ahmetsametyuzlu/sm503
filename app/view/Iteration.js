'use strict';

View.Iteration = function () {

    var me = new View.Abstract();

    me.model.iterationList = null;

    me.setIterationListModel = function (iterationModel) {
        me.model.iterationList = iterationModel;
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
        me.html += '        <label>Target Phase Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">#</span>';
        me.html += '            <input name="targetPhaseId" type="number" class="form-control">';
        me.html += '        </div>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Name</label>';
        me.html += '        <input name="name" type="text" class="form-control" required>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Objectives</label>';
        me.html += '        <textarea name="objectives" class="form-control" required rows="4"></textarea>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Evaluation Criteria</label>';
        me.html += '        <textarea name="evaluationCriteria" class="form-control" required rows="4"></textarea>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Status</label>';
        me.html += '        <select name="status" class="form-control"><option>Planned</option><option>Not Planned</option><option>Completed</option><option>On-going</option></select>';
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

        var iteration = me.model.iterationList.get(iterationId);
        var input = {
            iterationId: $("[name=iterationId]"),
            targetPhaseId: $("[name=targetPhaseId]"),
            name: $("[name=name]"),
            objectives: $("[name=objectives]"),
            evaluationCriteria: $("[name=evaluationCriteria]"),
            status: $("[name=status]"),
            plannedStartDate: $("[name=plannedStartDate]"),
            plannedCompletionDate: $("[name=plannedCompletionDate]"),
        };
        input.iterationId.prop('disabled', true);
        input.iterationId.val(iteration.iterationId);
        input.targetPhaseId.prop('disabled', true);
        input.targetPhaseId.val(iteration.targetPhaseId);
        input.name.val(iteration.name);
        input.objectives.val(iteration.objectives);
        input.evaluationCriteria.val(iteration.evaluationCriteria);
        input.status.val(iteration.status);
        input.plannedStartDate.val(iteration.plannedStartDate.toJSON().slice(0, 10));
        input.plannedCompletionDate.val(iteration.plannedCompletionDate.toJSON().slice(0, 10));
    };

    me.renderCreate = function (targetPhaseId) {
        me.html = '';
        me.html += '<h1 class="main-title">Iteration Create</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var input = {
            iterationId: $("[name=iterationId]"),
            targetPhaseId: $("[name=targetPhaseId]")
        };
        input.iterationId.val(me.model.iterationList.getNewId());
        input.targetPhaseId.prop('disabled', true);
        input.targetPhaseId.val(targetPhaseId);

        $("[name=iterationId]").change(function () {
            var iterationId = parseInt($(this).val());
            if (me.model.iterationList.getIndex(iterationId) !== false) {
                bootbox.alert('There is already a defined iteration in the system with this iteration id #' + String(iterationId) + '. ');
                $("[name=iterationId]").val('');
            }
        });
    };

    return me;

};