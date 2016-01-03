'use strict';

Model.WorkItem = function () {

    var me = this;

    me.projectId = '';
    me.name = '';
    me.description = '';
    me.determinedBudged = '';
    me.estimatedCost = '';
    me.plannedStartDate = '';
    me.plannedCompletionDate = '';

    me.setData = function (data) {
        me.projectId = parseInt(data.projectId);
        me.name = data.name;
        me.description = data.description;
        me.determinedBudged = parseInt(data.determinedBudged);
        me.estimatedCost = parseInt(data.estimatedCost);
        me.plannedStartDate = new Date(data.plannedStartDate);
        me.plannedCompletionDate = new Date(data.plannedCompletionDate);
    };

    me.getData = function () {
        var data = {};
        data.projectId = me.projectId;
        data.name = me.name;
        data.description = me.description;
        data.determinedBudged = me.determinedBudged;
        data.estimatedCost = me.estimatedCost;
        data.plannedStartDate = me.plannedStartDate.toString();
        data.plannedCompletionDate = me.plannedCompletionDate.toString();
        return data;
    };

    return me;
};