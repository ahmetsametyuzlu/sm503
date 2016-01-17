'use strict';

Model.DeveloperCatalog = (function () {

    var Object = function () {

        var me = this;

        me.developers = [];

        me.init = function () {
            var developers = Data.get('developers', []);
            for (var i = 0; i < developers.length; i++) {
                var developer = new Model.Developer();
                developer.setData(developers[i]);
                me.developers.push(developer);
            }
        };

        me.create = function (developerData) {
            var developer = new Model.Developer();
            developer.setData(developerData);
            me.developers.unshift(developer);
        };

        me.update = function (developerId, developerData) {
            me.developers[me.getIndex(developerId)].setData(developerData);
        };

        me.save = function (developerData) {
            var developerId = parseInt(developerData.developerId);
            if (me.getIndex(developerId) !== false) {
                me.update(developerId, developerData);
            } else {
                me.create(developerData);
            }
        };

        me.delete = function (developerId) {
            me.developers.splice(me.getIndex(developerId), 1);
        };

        me.get = function (developerId) {
            return me.developers[me.getIndex(developerId)];
        };

        me.getNewId = function () {
            var maxId = 0;
            for (var i = 0; i < me.developers.length; i++) {
                if (me.developers[i].developerId > maxId) {
                    maxId = me.developers[i].developerId;
                }
            }
            return maxId + 1;
        };

        me.getIndex = function (developerId) {
            for (var i = 0; i < me.developers.length; i++) {
                if (me.developers[i].developerId == developerId) {
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