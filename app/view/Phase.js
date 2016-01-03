'use strict';

View.Phase = function () {

    var me = new View.Abstract();

    me.phaseModel = null;

    me.setPhaseModel = function (phaseModel) {
        me.phaseModel = phaseModel;
    };

    me.init = function () {

    };

    me.renderList = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Phases</h1>';
        if (me.phaseModel.phases.length == 0) {
            me.html += '<div class="jumbotron">';
            me.html += '<p>There is no defined phase. Click the button to create a new one!</p>';
            me.html += '<p><a class="btn btn-success btn-lg" href="#" data-page="phase-create"><i class="fa fa-plus"></i> Create New Phase</a></p>';
            me.html += '</div>';
        } else {
            me.html += '<div class="create-phase-button"><a class="btn btn-success btn-sm" href="#" data-page="phase-create"><i class="fa fa-plus"></i> Create New Phase</a></div>';
            me.html += '<table class="table table-bordered table-striped table-hover">';
            me.html += '<thead>';
            me.html += '    <tr>';
            me.html += '        <th width="5%">Id</th>';
            me.html += '        <th width="85%">Title</th>';
            me.html += '        <th width="10%" class="text-center">Actions</th>';
            me.html += '    </tr>';
            me.html += '</thead>';
            me.html += '<tbody>';
            for (var i = 0; i < me.phaseModel.phases.length; i++) {
                me.html += '    <tr>';
                me.html += '        <td>#' + me.phaseModel.phases[i].phaseId + '</td>';
                me.html += '        <td>' + me.phaseModel.phases[i].name + '</td>';
                me.html += '        <td class="text-center">';
                me.html += '            <a href="#" class="btn btn-danger btn-xs" data-page="phase-delete" data-phase-id="' + me.phaseModel.phases[i].phaseId + '"><i class="fa fa-minus-square"></i></a>';
                me.html += '            <a href="#" class="btn btn-success btn-xs" data-page="phase-edit" data-phase-id="' + me.phaseModel.phases[i].phaseId + '"><i class="fa fa-edit"></i></a>';
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
        me.html += '<form id="phase-form">';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Phase Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">#</span>';
        me.html += '            <input name="phaseId" type="number" class="form-control">';
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
            name: $("[name=name]"),
            description: $("[name=description]"),
            determinedBudged: $("[name=determinedBudged]"),
            estimatedCost: $("[name=estimatedCost]"),
            plannedStartDate: $("[name=plannedStartDate]"),
            plannedCompletionDate: $("[name=plannedCompletionDate]"),
        };
        input.phaseId.prop('disabled', true);
        input.phaseId.val(phase.phaseId);
        input.name.val(phase.name);
        input.description.val(phase.description);
        input.determinedBudged.val(phase.determinedBudged);
        input.estimatedCost.val(phase.estimatedCost);
        input.plannedStartDate.val(phase.plannedStartDate.toJSON().slice(0, 10));
        input.plannedCompletionDate.val(phase.plannedCompletionDate.toJSON().slice(0, 10));
    };

    me.renderCreate = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Phase Create</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        $("[name=phaseId]").change(function () {
            var phaseId = parseInt($(this).val());
            if (me.phaseModel.getIndex(phaseId) !== false) {
                bootbox.alert('There is already a defined phase in the system with this phase id #' + String(phaseId) + '. ');
                $("[name=phaseId]").val('');
            }
        });
    };

    return me;

};