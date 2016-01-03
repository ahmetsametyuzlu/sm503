'use strict';

Model.IterationList = (function () {

    var Object = function () {

        var me = this;

        me.iterations = [];

        me.init = function () {
            var iterations = Data.get('iterations', []);
            for (var i = 0; i < iterations.length; i++) {
                var iteration = new Model.Iteration();
                iteration.setData(iterations[i]);
                me.iterations.push(iteration);
            }
        };

        me.create = function (iterationData) {
            var iteration = new Model.Iteration();
            iteration.setData(iterationData);
            me.iterations.unshift(iteration);
        };

        me.update = function (iterationId, iterationData) {
            me.iterations[me.getIndex(iterationId)].setData(iterationData);
        };

        me.save = function (iterationData) {
            var iterationId = parseInt(iterationData.iterationId);
            if (me.getIndex(iterationId) !== false) {
                me.update(iterationId, iterationData);
            } else {
                me.create(iterationData);
            }
        };

        me.delete = function (iterationId) {
            me.iterations.splice(me.getIndex(iterationId), 1);
        };

        me.get = function (iterationId) {
            return me.iterations[me.getIndex(iterationId)];
        };

        me.getIndex = function (iterationId) {
            for (var i = 0; i < me.iterations.length; i++) {
                if (me.iterations[i].iterationId == iterationId) {
                    return i;
                }
            }
            return false;
        };

        me.getList = function () {
            return me.phases;
        };

        me.getListByPhaseId = function (projectId) {
            return _.filter(me.phases, function (phase) {
                return phase.targetProjectId == projectId;
            });
        };

    };

    var instance;

    return {
        getInstance: function () {
            if (!instance) {
                instance = new Object();
                instance.init()
            }
            return instance;
        }
    };

})();