'use strict';

Model.Iteration = function () {

    var me = this;

    me.iterationId = null;
    me.targetPhaseId = null;
    me.name = null;
    me.objectives = null;
    me.evaluationCriteria = null;
    me.status = null;
    me.plannedStartDate = null;
    me.plannedCompletionDate = null;

    me.setData = function (data) {
        me.iterationId = parseInt(data.iterationId);
        me.targetPhaseId = parseInt(data.targetPhaseId);
        me.name = data.name;
        me.objectives = data.objectives;
        me.evaluationCriteria = data.evaluationCriteria;
        me.status = ['Planned', 'Not Planned', 'Completed', 'On-going'].indexOf(data.status) !== -1 ? data.status : null;
        me.plannedStartDate = new Date(data.plannedStartDate);
        me.plannedCompletionDate = new Date(data.plannedCompletionDate);
    };

    me.getData = function () {
        var data = {};
        data.iterationId = me.iterationId;
        data.targetPhaseId = me.targetPhaseId;
        data.name = me.name;
        data.objectives = me.objectives;
        data.evaluationCriteria = me.evaluationCriteria;
        data.status = me.status;
        data.targetIterationId = me.targetIterationId;
        data.plannedStartDate = me.plannedStartDate.toString();
        data.plannedCompletionDate = me.plannedCompletionDate.toString();
        return data;
    };

    return me;

};

