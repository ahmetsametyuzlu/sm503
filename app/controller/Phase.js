'use strict';

Controller.Phase = function () {

    var me = new Controller.Abstract();

    me.view.phase = null;

    me.model.phaseCatalog = null;

    me.setPhaseView = function (phaseView) {
        me.view.phase = phaseView;
        me.view.phase.setPhaseModel(me.model.phaseCatalog);
    };

    me.setPhaseModel = function (phaseModel) {
        me.model.phaseCatalog = phaseModel;
    };

    me.init = function () {
        // Set model(s)
        me.setPhaseModel(Model.PhaseCatalog.getInstance());
        // Set view
        me.setPhaseView(new View.Phase());
        // Add listeners
        me.addCatalogeners();
    };

    me.addCatalogeners = function () {

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
            me.model.phaseCatalog.save(dataObj);

            $('a[data-page="project-plan"]').click();
        });

    };

    return me;

};