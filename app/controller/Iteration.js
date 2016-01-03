'use strict';

Controller.Iteration = function () {

    var me = new Controller.Abstract();

    me.view.iteration = null;

    me.model.iterationList = null;

    me.setIterationView = function (iterationView) {
        me.view.iteration = iterationView;
        me.view.iteration.setIterationListModel(me.model.iterationList);
    };

    me.setIterationListModel = function (iterationModel) {
        me.model.iterationList = iterationModel;
    };

    me.init = function () {
        // Set model(s)
        me.setIterationListModel(Model.IterationList.getInstance());
        // Set view
        me.setIterationView(new View.Iteration());
        // Add listeners
        me.addListeners();
    };

    me.addListeners = function () {

        // Iteration Create
        $(document).on('click', 'a[data-page="iteration-create"]', function (e) {
            var phaseId = parseInt($(this).data('phase-id'));
            me.view.iteration.renderCreate(phaseId);
        });

        // Iteration Edit
        $(document).on('click', 'a[data-page="iteration-edit"]', function (e) {
            var iterationId = parseInt($(this).data('iteration-id'));
            me.view.iteration.renderEdit(iterationId);
        });

        // Iteration Form Submit
        $(document).on('click', 'button[data-form-action="iteration-submit"]', function (e) {
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
            me.model.iterationList.save(dataObj);

            $('a[data-page="project-plan"]').click();
        });

        // Iteration Delete
        $(document).on('click', 'a[data-page="iteration-delete"]', function (e) {
            var iterationId = parseInt($(this).data('iteration-id'));
            bootbox.confirm('Are you sure to delete this iteration with all related data?', function (d) {
                if (d) {
                    me.model.iterationList.delete(iterationId);
                    $('a[data-page="project-plan"]').click();
                }
            });
        });
    };

    return me;

};