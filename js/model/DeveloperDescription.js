'use strict';

var Model_DeveloperDescription = function () {

    var me = this;

    me.developerId = '';
    me.name = '';
    me.title = '';
    me.assignedProjectIds = [];

    me.setData = function (data) {
        me.developerId = data.developerId;
        me.name = data.name;
        me.title = data.title;
        me.assignedProjectIds = data.assignedProjectIds;
    }

};