'use strict';

var Model_Project = function () {

    var me = this;

    me.projects = [];

    me.init = function (projects) {
        for (var i = 0; projects.length; i++) {
            var project = new Model_ProjectDescription();
            project.setData(projects[i]);
            me.projects.push(project);
        }
    };

    me.create = function (projectData) {
        var project = new Model_ProjectDescription();
        project.setData(projectData);
        me.projects.push(project);
    };

    me.update = function (projectId, projectData) {
        me.projects[me.getIndex(projectId)].setData(projectData);
    };

    me.delete = function (projectId) {
        me.projects.split(me.getIndex(projectId), 1);
    };

    me.get = function (projectId) {
        return me.projects[me.getIndex(projectId)];
    };

    me.getIndex = function (projectId) {
        for (var i = 0; me.projects.length; i++) {
            if (me.projects[i].projectId == projectId) {
                return i;
            }
        }
    };

};