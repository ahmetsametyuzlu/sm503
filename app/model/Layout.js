'use strict';

Model.Layout = (function () {

    var Object = function () {

        var me = this;

        me.activeProjectId = null;

        me.init = function () {

        };

        return me;

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
