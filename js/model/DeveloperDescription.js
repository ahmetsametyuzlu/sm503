'use strict';

var Model_DeveloperDescription = function () {

    var me = this;

    me.developerId = '';
    me.name = '';
    me.title = '';
    me.assignedProjectIds = [];

    me.setData = function (data) {
        me.developerId = parseInt(data.developerId);
        me.name = data.name;
        me.title = data.title;
        me.assignedProjectIds = data.assignedProjectIds || [];
    };

    me.getData = function () {
        var data = {};
        data.developerId = me.developerId;
        data.name = me.name;
        data.title = me.title;
        data.assignedProjectIds = me.assignedProjectIds;
        return data;
    };

    return me;

};