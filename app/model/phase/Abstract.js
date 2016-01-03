Model.Phase.Abstract = function () {

    var me = this;

    me.phaseId = null;
    me.targetProjectId = null;
    me.name = null;
    me.description = null;
    me.plannedStartDate = null;
    me.plannedCompletionDate = null;

    me.setData = function (data) {
        me.phaseId = parseInt(data.phaseId);
        me.targetProjectId = parseInt(data.targetProjectId);
        me.name = data.name;
        me.description = data.description;
        me.plannedStartDate = new Date(data.plannedStartDate);
        me.plannedCompletionDate = new Date(data.plannedCompletionDate);
    };

    me.getData = function () {
        var data = {};
        data.phaseId = me.phaseId;
        data.targetProjectId = me.targetProjectId;
        data.name = me.name;
        data.description = me.description;
        data.type = me.type;
        data.plannedStartDate = me.plannedStartDate.toString();
        data.plannedCompletionDate = me.plannedCompletionDate.toString();
        return data;

    };

    return me;
};