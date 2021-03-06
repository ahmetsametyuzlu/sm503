'use strict';

View.Phase = function () {

    var me = new View.Abstract();

    me.phaseModel = null;

    me.setPhaseModel = function (phaseModel) {
        me.phaseModel = phaseModel;
    };

    me.init = function () {

    };

    me.form = function () {
        me.html += '<form id="phase-form">';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Phase Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">#</span>';
        me.html += '            <input name="phaseId" type="number" disabled class="form-control">';
        me.html += '        </div>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Target Project Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">#</span>';
        me.html += '            <input name="targetProjectId" type="number" disabled class="form-control">';
        me.html += '        </div>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Name</label>';
        me.html += '        <input name="name" type="text" disabled class="form-control" required>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Description</label>';
        me.html += '        <textarea name="description" disabled class="form-control" required rows="4"></textarea>';
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
        me.html += '    <button type="button" data-form-action="phase-submit" class="btn btn-success"><i class="fa fa-save"></i> Submit</button>';
        me.html += '</form>';
    };

    me.renderEdit = function (phaseId) {
        me.html = '';
        me.html += '<h1 class="main-title">Phase Edit</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var phase = me.phaseModel.get(phaseId);
        var input = {
            phaseId: $("[name=phaseId]"),
            targetProjectId: $("[name=targetProjectId]"),
            name: $("[name=name]"),
            description: $("[name=description]"),
            plannedStartDate: $("[name=plannedStartDate]"),
            plannedCompletionDate: $("[name=plannedCompletionDate]"),
        };
        input.phaseId.val(phase.phaseId);
        input.targetProjectId.val(phase.targetProjectId);
        input.name.val(phase.name);
        input.description.val(phase.description);
        input.plannedStartDate.val(phase.plannedStartDate.toJSON().slice(0, 10));
        input.plannedCompletionDate.val(phase.plannedCompletionDate.toJSON().slice(0, 10));
    };


    return me;

};