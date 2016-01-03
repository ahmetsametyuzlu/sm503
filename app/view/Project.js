'use strict';

View.Project = function () {

    var me = new View.Abstract();

    me.model.projectList = null;
    me.model.phaseList = null;
    me.model.iterationList = null;
    me.model.workItemList = null;

    me.setProjectListModel = function (projectListModel) {
        me.model.projectList = projectListModel;
    };

    me.setPhaseListModel = function (phaseListModel) {
        me.model.phaseList = phaseListModel;
    };

    me.setIterationListModel = function (iterationListModel) {
        me.model.iterationList = iterationListModel;
    };

    me.setWorkItemListModel = function (workItemListModel) {
        me.model.workItemList = workItemListModel;
    };

    me.init = function () {

    };

    me.renderList = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Projects</h1>';
        if (me.model.projectList.projects.length == 0) {
            me.html += '<div class="jumbotron">';
            me.html += '<p>There is no defined project. Click the button to create a new one!</p>';
            me.html += '<p><a class="btn btn-success btn-lg" href="#" data-page="project-create"><i class="fa fa-plus"></i> Create New Project</a></p>';
            me.html += '</div>';
        } else {
            me.html += '<div class="create-project-button"><a class="btn btn-success btn-sm" href="#" data-page="project-create"><i class="fa fa-plus"></i> Create New Project</a></div>';
            me.html += '<table class="table table-bordered table-striped table-hover">';
            me.html += '<thead>';
            me.html += '    <tr>';
            me.html += '        <th width="5%">Id</th>';
            me.html += '        <th width="80%">Title</th>';
            me.html += '        <th width="15%" class="text-center">Actions</th>';
            me.html += '    </tr>';
            me.html += '</thead>';
            me.html += '<tbody>';
            for (var i = 0; i < me.model.projectList.projects.length; i++) {
                me.html += '    <tr>';
                me.html += '        <td>#' + me.model.projectList.projects[i].projectId + '</td>';
                me.html += '        <td>' + me.model.projectList.projects[i].name + '</td>';
                me.html += '        <td class="text-center">';
                me.html += '            <a href="#" class="btn btn-danger btn-xs" data-page="project-delete" data-project-id="' + me.model.projectList.projects[i].projectId + '" data-toggle="tooltip" data-placement="top" title="Delete Project"><i class="fa fa-minus-square"></i></a>';
                me.html += '            <a href="#" class="btn btn-success btn-xs" data-page="project-edit" data-project-id="' + me.model.projectList.projects[i].projectId + '" data-toggle="tooltip" data-placement="top" title="Edit Project"><i class="fa fa-edit"></i></a>';
                me.html += '            <a href="#" class="btn btn-default btn-xs" data-page="project-detail" data-project-id="' + me.model.projectList.projects[i].projectId + '" data-toggle="tooltip" data-placement="top" title="Project Detail"><i class="fa fa-info-circle"></i></a>';
                me.html += '        </td>';
                me.html += '    </tr>';
            }
            me.html += '</tbody>';
            me.html += '</table>';
        }

        me.clear();
        me.page.html(me.html);

        $('[data-toggle="tooltip"]').tooltip();
    };

    me.form = function () {
        me.html += '<form id="project-form">';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Project Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">#</span>';
        me.html += '            <input name="projectId" type="number" class="form-control">';
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
        me.html += '    <button type="button" data-form-action="project-submit" class="btn btn-success"><i class="fa fa-save"></i> Submit</button>';
        me.html += '</form>';
    };

    me.renderEdit = function (projectId) {
        me.html = '';
        me.html += '<h1 class="main-title">Project Edit #' + String(projectId) + '</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var project = me.model.projectList.get(projectId);
        var input = {
            projectId: $("[name=projectId]"),
            name: $("[name=name]"),
            description: $("[name=description]"),
            determinedBudged: $("[name=determinedBudged]"),
            estimatedCost: $("[name=estimatedCost]"),
            plannedStartDate: $("[name=plannedStartDate]"),
            plannedCompletionDate: $("[name=plannedCompletionDate]"),
        };
        input.projectId.prop('disabled', true);
        input.projectId.val(project.projectId);
        input.name.val(project.name);
        input.description.val(project.description);
        input.determinedBudged.val(project.determinedBudged);
        input.estimatedCost.val(project.estimatedCost);
        input.plannedStartDate.val(project.plannedStartDate.toJSON().slice(0, 10));
        input.plannedCompletionDate.val(project.plannedCompletionDate.toJSON().slice(0, 10));
    };

    me.renderDetail = function (projectId) {
        me.html = '';
        me.html += '<h1 class="main-title">Project Detail #' + String(projectId) + '</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var project = me.model.projectList.get(projectId);
        var input = {
            projectId: $("[name=projectId]"),
            name: $("[name=name]"),
            description: $("[name=description]"),
            determinedBudged: $("[name=determinedBudged]"),
            estimatedCost: $("[name=estimatedCost]"),
            plannedStartDate: $("[name=plannedStartDate]"),
            plannedCompletionDate: $("[name=plannedCompletionDate]"),
        };
        input.projectId.prop('disabled', true);
        input.projectId.val(project.projectId);
        input.name.val(project.name);
        input.description.val(project.description);
        input.determinedBudged.val(project.determinedBudged);
        input.estimatedCost.val(project.estimatedCost);
        input.plannedStartDate.val(project.plannedStartDate.toJSON().slice(0, 10));
        input.plannedCompletionDate.val(project.plannedCompletionDate.toJSON().slice(0, 10));

        $("form").find(":input").attr('disabled', true);
        $("form button").remove();
    };

    me.renderCreate = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Project Create</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        $("[name=projectId]").change(function () {
            var projectId = parseInt($(this).val());
            if (me.model.projectList.getIndex(projectId) !== false) {
                bootbox.alert('There is already a defined project in the system with this project id #' + String(projectId) + '. ');
                $("[name=projectId]").val('');
            }
        });
    };

    me.renderPlan = function (projectId) {
        me.html = '';
        me.html += '<h1 class="main-title">Project Plan #' + String(projectId) + '</h1>';
        for (var phase in me.phaseModel.getListByProjectId(projectId)) {
            me.html += '<div class="panel panel-primary">';
            me.html += '    <div class="panel-heading">' + phase.name + '</div>';
            me.html += '    <div class="panel-body">';

            for (var iteration in me.iterationModel.getListByPhaseId(phase.phaseId)) {
            }

            me.html += '    </div>';
            me.html += '</div>';
        }
        me.clear();
        me.page.html(me.html);
    };

    return me;

};