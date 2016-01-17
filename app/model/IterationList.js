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
            me.iterations.push(iteration);
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

        me.getNewId = function () {
            var maxId = 0;
            for (var i = 0; i < me.iterations.length; i++) {
                if (me.iterations[i].iterationId > maxId) {
                    maxId = me.iterations[i].iterationId;
                }
            }
            return maxId + 1;
        };

        me.getList = function () {
            return me.iterations;
        };

        me.getListByPhaseId = function (phaseId) {
            return _.filter(me.iterations, function (iteration) {
                return iteration.targetPhaseId == phaseId;
            });
        };

        me.generateForPhases = function (phases) {
            var iterationCount = {
                1: 1,
                2: 3,
                3: 6,
                4: 1
            };
            for (var phaseIndex in phases) {
                var phase = phases[phaseIndex];
                for (var i = 0; i < iterationCount[phase.type]; i++) {
                    me.create({
                        iterationId: me.getNewId(),
                        name: 'Iteration ' + String(i + 1),
                        description: '',
                        targetPhaseId: phase.phaseId
                    });
                }
            }
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