'use strict';

Controller.Phase = function () {

    var me = new Controller.Abstract();

    me.view.phase = null;

    me.model.phase = null;

    me.setPhaseView = function (phaseView) {
        me.view.phase = phaseView;
        me.view.phase.setPhaseModel(me.model.phase);
    };

    me.setPhaseModel = function (phaseModel) {
        me.model.phase = phaseModel;
    };

    me.init = function () {
        // Set model(s)
        me.setPhaseModel(Model.Phase.getInstance());
        // Set view
        me.setPhaseView(new View.Phase());
        // Add listeners
        me.addListeners();
    };

    me.addListeners = function () {
        // Phase List
        $(document).on('click', 'a[data-page="phase-list"]', function (e) {
            me.view.phase.renderList();
        });

        // Phase Create
        $(document).on('click', 'a[data-page="phase-create"]', function (e) {
            me.view.phase.renderCreate();
        });

        // Phase Edit
        $(document).on('click', 'a[data-page="phase-edit"]', function (e) {
            var phaseId = parseInt($(this).data('phase-id'));
            me.view.phase.renderEdit(phaseId);
        });

        // Phase Form Submit
        $(document).on('click', 'button[data-form-action="phase-submit"]', function (e) {
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
            me.model.phase.save(dataObj);

            me.view.phase.renderList();
        });

        // Phase Delete
        $(document).on('click', 'a[data-page="phase-delete"]', function (e) {
            var phaseId = parseInt($(this).data('phase-id'));
            bootbox.confirm('Are you sure to delete this phase with all related data?', function (d) {
                if (d) {
                    me.model.phase.delete(phaseId);
                    me.view.phase.renderList();
                }
            });
        });
    };

    return me;

};