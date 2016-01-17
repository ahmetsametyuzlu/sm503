'use strict';

Model.PhaseCatalog = (function () {

    var Object = function () {

        var me = this;

        me.phaseTypes = {
            1: 'Inspection',
            2: 'Elaboration',
            3: 'Construction',
            4: 'Transition'
        };

        me.phases = [];

        me.init = function () {
            var phases = Data.get('phases', []);
            for (var i = 0; i < phases.length; i++) {
                var phase = new Model.Phase[me.phaseTypes[phases[i].type]]();
                phase.setData(phases[i]);
                me.phases.push(phase);
            }
        };

        me.create = function (type, phaseData) {
            phaseData.phaseId = me.getNewId();
            var phase = new Model.Phase[me.phaseTypes[type]]();
            phase.setData(phaseData);
            me.phases.push(phase);
        };

        me.generateForProject = function (projectId) {
            for (var type in me.phaseTypes) {
                me.create(type, {
                    targetProjectId: projectId
                });
            }
        };

        me.update = function (phaseId, phaseData) {
            me.phases[me.getIndex(phaseId)].setData(phaseData);
        };

        me.save = function (phaseData) {
            var phaseId = parseInt(phaseData.phaseId);
            if (me.getIndex(phaseId) !== false) {
                me.update(phaseId, phaseData);
            } else {
                me.create(phaseData);
            }
        };

        me.delete = function (phaseId) {
            me.phases.splice(me.getIndex(phaseId), 1);
        };

        me.get = function (phaseId) {
            return me.phases[me.getIndex(phaseId)];
        };

        me.getIndex = function (phaseId) {
            for (var i = 0; i < me.phases.length; i++) {
                if (me.phases[i].phaseId == phaseId) {
                    return i;
                }
            }
            return false;
        };

        me.getNewId = function () {
            var maxId = 0;
            for (var i = 0; i < me.phases.length; i++) {
                if (me.phases[i].phaseId > maxId) {
                    maxId = me.phases[i].phaseId;
                }
            }
            return maxId + 1;
        };

        me.getCatalog = function () {
            return me.phases;
        };

        me.getCatalogByProjectId = function (projectId) {
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