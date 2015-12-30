'use strict';

Model.Project = (function () {

    var Object = function () {

        var me = this;

        me.projects = [];

        me.init = function () {
            var projects = Data.get('projects', []);
            for (var i = 0; i < projects.length; i++) {
                var project = new Model.ProjectDescription();
                project.setData(projects[i]);
                me.projects.push(project);
            }
        };

        me.create = function (projectData) {
            var project = new Model.ProjectDescription();
            project.setData(projectData);
            me.projects.unshift(project);
        };

        me.update = function (projectId, projectData) {
            me.projects[me.getIndex(projectId)].setData(projectData);
        };

        me.save = function (projectData) {
            var projectId = parseInt(projectData.projectId);
            if (me.getIndex(projectId) !== false) {
                me.update(projectId, projectData);
            } else {
                me.create(projectData);
            }
        };

        me.delete = function (projectId) {
            me.projects.splice(me.getIndex(projectId), 1);
        };

        me.get = function (projectId) {
            return me.projects[me.getIndex(projectId)];
        };

        me.getIndex = function (projectId) {
            for (var i = 0; i < me.projects.length; i++) {
                if (me.projects[i].projectId == projectId) {
                    return i;
                }
            }
            return false;
        };
    };

    var instance;

    return {
        getInstance: function () {
            if (!instance) {
                instance = new Object();
                instance.init();
            }
            return instance;
        }
    };

})();