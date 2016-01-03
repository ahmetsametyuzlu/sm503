'use strict';

Model.PhaseList = (function () {

    var Object = function () {

        var me = this;

        me.phases = [];

        me.init = function () {
            var phases = Data.get('phases', []);
            for (var i = 0; i < phases.length; i++) {
                var phase = new Model.PhaseListDescription();
                phase.setData(phases[i]);
                me.phases.push(phase);
            }
        };

        me.create = function (phaseData) {
            var phase = new Model.PhaseListDescription();
            phase.setData(phaseData);
            me.phases.unshift(phase);
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