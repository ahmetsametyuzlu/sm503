'use strict';

Model.SchedulingAlgorithm.Factory = (function () {

    var Object = function () {

        var me = this;

        me.init = function () {

        };

        me.getSchedulingAlgorithmBase = function () {
            return me.projects;
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