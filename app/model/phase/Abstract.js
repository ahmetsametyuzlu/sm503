Model.Phase.Abstract = function () {
    var me = this;

    me.phaseId = null;
    me.targetProjectId = null;
    me.name = null;
    me.description = null;
    me.plannedStartDate = null;
    me.plannedCompletionDate = null;

    return me;
};