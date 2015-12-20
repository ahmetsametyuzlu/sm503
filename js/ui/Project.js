'use strict';

var Ui_Project = function () {

    var me = new Ui_Base();

    me.projectModel = null;

    me.setProjectModel = function (projectModel) {
        me.projectModel = projectModel;
    };

    me.init = function () {

        // Project List
        $(document).on('click', 'a[data-page="project-list"]', function (e) {
            e.preventDefault();
            me.renderList();
        });

        // Project Create
        $(document).on('click', 'a[data-page="project-create"]', function (e) {
            e.preventDefault();
            me.renderCreate();
        });

        // Project Edit
        $(document).on('click', 'a[data-page="project-edit"]', function (e) {
            e.preventDefault();
            var projectId = parseInt($(this).data('project-id'));
            me.renderEdit(projectId);
        });

        // Project Form Submit
        $(document).on('click', 'button[data-form-action="project-submit"]', function (e) {
            e.preventDefault();
            var form = $(this).closest('form');
            var data = form.serializeArray();
            console.log(data);
            me.renderList();
        });

        // Project Delete
        $(document).on('click', 'a[data-page="project-delete"]', function (e) {
            e.preventDefault();
            var projectId = parseInt($(this).data('project-id'));
            bootbox.confirm('Are you sure to delete this project with all related data?', function (d) {
                if (d) {
                    me.projectModel.delete(projectId);
                    me.renderList();
                }
            });
        });

    };

    me.renderList = function () {

        me.html = '';
        me.html += '<h1 class="main-title">Projects</h1>';
        if (me.projectModel.projects.length == 0) {
            me.html += '<p>There is no defined project. Click <a href="#" class="btn btn-success btn-xs" data-page="project-create">here</a> to create a new one!</p>';
        } else {
            me.html += '<ul>';
            for (var i = 0; i < me.projectModel.projects.length; i++) {
                me.html += '<li>' + me.projectModel.projects[i].name + '</li>';
            }
            me.html += '</ul>';
        }

        me.page.empty();
        me.page.html(me.html);

    };

    me.form = function () {
        me.html += '<form id="project-form">';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Project Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">@</span>';
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
        me.html += '                    <input name="determinedBudged" type="text" class="form-control">';
        me.html += '                    <span class="input-group-addon">.00</span>';
        me.html += '                </div>';
        me.html += '            </div>';
        me.html += '            <div class="col-sm-6">';
        me.html += '                <label>Estimated Cost</label>';
        me.html += '                <div class="input-group">';
        me.html += '                    <span class="input-group-addon">$</span>';
        me.html += '                    <input name="estimatedCost" type="text" class="form-control">';
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
        me.html += '<h1 class="main-title">Project Edit</h1>';
        me.form();

        me.page.empty();
        me.page.html(me.html);
    };

    me.renderCreate = function () {

        me.html = '';
        me.html += '<h1 class="main-title">Project Create</h1>';
        me.form();

        me.page.empty();
        me.page.html(me.html);

    };

    return me;

};