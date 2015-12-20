'use strict';

var Model_ProjectDescription = function () {

    var me = this;

    me.projectId = '';
    me.name = '';
    me.description = '';
    me.determinedBudged = '';
    me.estimatedCost = '';
    me.plannedStartDate = '';
    me.plannedCompletionDate = '';

    me.setData = function (data) {
        me.projectId = data.projectId;
        me.name = data.name;
        me.description = data.description;
        me.determinedBudged = data.determinedBudged;
        me.estimatedCost = data.estimatedCost;
        me.plannedStartDate = new Date(data.plannedStartDate);
        me.plannedCompletionDate = new Date(data.plannedCompletionDate);
    }

};