'use strict';

View.Developer = function () {

    var me = new View.Abstract();

    me.model.developerList = null;
    me.model.projectList = null;

    me.setDeveloperModel = function (developerModel) {
        me.model.developerList = developerModel;
    };

    me.setProjectListModel = function (projectListModel) {
        me.model.projectList = projectListModel;
    };

    me.init = function () {

    };

    me.renderList = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Developers</h1>';
        if (me.model.developerList.developers.length == 0) {
            me.html += '<div class="jumbotron">';
            me.html += '<p>There is no defined developer. Click the button to create a new one!</p>';
            me.html += '<p><a class="btn btn-success btn-lg" href="#" data-page="developer-create"><i class="fa fa-plus"></i> Create New Developer</a></p>';
            me.html += '</div>';
        } else {
            me.html += '<div class="create-developer-button"><a class="btn btn-success btn-sm" href="#" data-page="developer-create"><i class="fa fa-user-plus"></i> Create New Developer</a></div>';
            me.html += '<table class="table table-bordered table-striped table-hover">';
            me.html += '<thead>';
            me.html += '    <tr>';
            me.html += '        <th width="5%">Id</th>';
            me.html += '        <th width="85%">Name</th>';
            me.html += '        <th width="10%" class="text-center">Actions</th>';
            me.html += '    </tr>';
            me.html += '</thead>';
            me.html += '<tbody>';
            for (var i = 0; i < me.model.developerList.developers.length; i++) {
                me.html += '    <tr>';
                me.html += '        <td>#' + me.model.developerList.developers[i].developerId + '</td>';
                me.html += '        <td>' + me.model.developerList.developers[i].name + '<br>' + me.model.developerList.developers[i].title + '</td>';
                me.html += '        <td class="text-center">';
                me.html += '            <a href="#" class="btn btn-danger btn-xs" data-page="developer-delete" data-developer-id="' + me.model.developerList.developers[i].developerId + '"><i class="fa fa-minus-square"></i></a>';
                me.html += '            <a href="#" class="btn btn-success btn-xs" data-page="developer-edit" data-developer-id="' + me.model.developerList.developers[i].developerId + '"><i class="fa fa-edit"></i></a>';
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
        me.html += '<form id="developer-form">';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Developer Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">#</span>';
        me.html += '            <input name="developerId" type="number" class="form-control">';
        me.html += '        </div>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Name</label>';
        me.html += '        <input name="name" type="text" class="form-control" required>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Title</label>';
        me.html += '        <input name="title" type="text" class="form-control" required>';
        me.html += '    </div>';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Projects</label>';
        for (var i = 0; i < me.model.projectList.projects.length; i++) {
            me.html += '    <div class="checkbox"><label><input type="checkbox" name="assignedProjectIds" value="' + me.model.projectList.projects[i].projectId + '"> ' + me.model.projectList.projects[i].name + '</label></div>';
        }
        me.html += '    </div>';
        me.html += '    <button type="button" data-form-action="developer-submit" class="btn btn-success"><i class="fa fa-save"></i> Submit</button>';
        me.html += '</form>';
    };

    me.renderEdit = function (developerId) {
        me.html = '';
        me.html += '<h1 class="main-title">Developer Edit</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var developer = me.model.developerList.get(developerId);
        var input = {
            developerId: $("[name=developerId]"),
            name: $("[name=name]"),
            title: $("[name=title]")
        };
        input.developerId.prop('disabled', true);
        input.developerId.val(developer.developerId);
        input.name.val(developer.name);
        input.title.val(developer.title);
        for (var i = 0; i < developer.assignedProjectIds.length; i++) {
            $("[name=assignedProjectIds][value=" + String(developer.assignedProjectIds[i]) + "]").prop('checked', true);
        }
    };

    me.renderCreate = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Developer Create</h1>';
        me.form();

        me.clear();
        me.page.html(me.html);

        var newDeveloperId = me.model.developerList.getNewId();
        $("[name=developerId]").val(newDeveloperId);

        $("[name=developerId]").change(function () {
            var developerId = parseInt($(this).val());
            if (me.model.developerList.getIndex(developerId) !== false) {
                bootbox.alert('There is already a defined developer in the system with this developer id #' + String(developerId) + '. ');
                $("[name=developerId]").val('');
            }
        });
    };

    return me;
};