'use strict';

Model.WorkItem = function () {

    var me = this;

    me.workItemId = null;
    me.name = null;
    me.description = null;
    me.status = null;
    me.priority = null;
    me.targetIterationId = null;
    me.predecessorWorkItem = null;
    me.estimatedEffort = null;
    me.plannedStartDate = null;
    me.plannedCompletionDate = null;

    me.setData = function (data) {
        me.workItemId = parseInt(data.workItemId);
        me.name = data.name;
        me.description = data.description;
        me.status = ['Planned', 'Not Planned', 'Completed', 'On-going'].indexOf(data.status) !== -1 ? data.status : null;
        me.priority = ['High', 'Middle', 'Low'].indexOf(data.priority) !== -1 ? data.priority : null;
        me.targetIterationId = parseInt(data.targetIterationId);
        me.predecessorWorkItem = data.predecessorWorkItem;
        me.estimatedEffort = data.estimatedEffort;
        me.plannedStartDate = new Date(data.plannedStartDate);
        me.plannedCompletionDate = new Date(data.plannedCompletionDate);
    };

    me.getData = function () {
        var data = {};
        data.workItemId = me.workItemId;
        data.name = me.name;
        data.description = me.description;
        data.status = me.status;
        data.priority = me.priority;
        data.targetIterationId = me.targetIterationId;
        data.predecessorWorkItem = me.predecessorWorkItem;
        data.estimatedEffort = me.estimatedEffort;
        data.plannedStartDate = me.plannedStartDate.toString();
        data.plannedCompletionDate = me.plannedCompletionDate.toString();
        return data;
    };

    return me;
};