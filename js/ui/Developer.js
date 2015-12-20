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
            me.html += '<p>There is no defined developer. Click <a href="#" class="btn btn-success btn-xs" data-page="developer-create">here</a> to create a new one!</p>';
        } else {
            me.html += '<ul>';
            for (var i = 0; i < me.developerModel.developers.length; i++) {
                me.html += '<li>' + me.developerModel.developers[i].name + '</li>';
            }
            me.html += '</ul>';
        }

        me.page.empty();
        me.page.html(me.html);

    };

    me.form = function () {

        me.html += '<form id="developer-form">';
        me.html += '    <div class="form-group">';
        me.html += '        <label>Developer Id</label>';
        me.html += '        <div class="input-group">';
        me.html += '            <span class="input-group-addon">@</span>';
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