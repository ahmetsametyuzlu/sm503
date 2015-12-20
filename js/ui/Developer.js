'use strict';

var Ui_Developer = function () {

    var me = new Ui_Base();

    me.developerModel = null;

    me.setDeveloperModel = function (developerModel) {
        me.developerModel = developerModel;
    };

    me.init = function () {

        // Developer List
        $(document).on('click', 'a[data-page="developer-list"]', function (e) {
            e.preventDefault();
            me.renderList();
        });

        // Developer Create
        $(document).on('click', 'a[data-page="developer-create"]', function (e) {
            e.preventDefault();
            me.renderCreate();
        });

        // Developer Edit
        $(document).on('click', 'a[data-page="developer-edit"]', function (e) {
            e.preventDefault();
            var developerId = parseInt($(this).data('developer-id'));
            me.renderEdit(developerId);
        });

        // Developer Form Submit
        $(document).on('click', 'button[data-form-action="developer-submit"]', function (e) {
            e.preventDefault();
            var form = $(this).closest('form');
            var disabled = form.find("[disabled]");
            disabled.prop('disabled', false);

            var data = form.serializeArray();
            var dataObj = {};
            for (var i = 0; i < data.length; i++) {
                dataObj[data[i].name] = data[i].value;
                if (data[i].value == '') {
                    bootbox.alert('All the fields are required. Fill them! ');
                    disabled.prop('disabled', true);
                    return false;
                }
            }
            me.developerModel.save(dataObj);

            me.renderList();
        });

        // Developer Delete
        $(document).on('click', 'a[data-page="developer-delete"]', function (e) {
            e.preventDefault();
            var developerId = parseInt($(this).data('developer-id'));
            bootbox.confirm('Are you sure to delete this developer with all related data?', function (d) {
                if (d) {
                    me.developerModel.delete(developerId);
                    me.renderList();
                }
            });
        });

    };

    me.renderList = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Developers</h1>';
        if (me.developerModel.developers.length == 0) {
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
            for (var i = 0; i < me.developerModel.developers.length; i++) {
                me.html += '    <tr>';
                me.html += '        <td>#' + me.developerModel.developers[i].developerId + '</td>';
                me.html += '        <td>' + me.developerModel.developers[i].name + '<br>' + me.developerModel.developers[i].title + '</td>';
                me.html += '        <td class="text-center">';
                me.html += '            <a href="#" class="btn btn-danger btn-xs" data-page="developer-delete" data-developer-id="' + me.developerModel.developers[i].developerId + '"><i class="fa fa-minus-square"></i></a>';
                me.html += '            <a href="#" class="btn btn-success btn-xs" data-page="developer-edit" data-developer-id="' + me.developerModel.developers[i].developerId + '"><i class="fa fa-edit"></i></a>';
                me.html += '        </td>';
                me.html += '    </tr>';
            }
            me.html += '</tbody>';
            me.html += '</table>';
        }

        me.page.empty();
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
        me.html += '    <button type="button" data-form-action="developer-submit" class="btn btn-success"><i class="fa fa-save"></i> Submit</button>';
        me.html += '</form>';
    };

    me.renderEdit = function (developerId) {
        me.html = '';
        me.html += '<h1 class="main-title">Developer Edit</h1>';
        me.form();

        me.page.empty();
        me.page.html(me.html);

        var developer = me.developerModel.get(developerId);
        var input = {
            developerId: $("[name=developerId]"),
            name: $("[name=name]"),
            title: $("[name=title]")
        };
        input.developerId.prop('disabled', true);
        input.developerId.val(developer.developerId);
        input.name.val(developer.name);
        input.title.val(developer.title);
    };

    me.renderCreate = function () {
        me.html = '';
        me.html += '<h1 class="main-title">Developer Create</h1>';
        me.form();

        me.page.empty();
        me.page.html(me.html);
    };

    return me;
};