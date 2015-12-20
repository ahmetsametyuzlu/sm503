'use strict';

var Model_Developer = function () {

    var me = this;

    me.developers = [];

    me.init = function (developers) {
        for (var i = 0; i < developers.length; i++) {
            var developer = new Model_DeveloperDescription();
            developer.setData(developers[i]);
            me.developers.push(developer);
        }
    };

    me.create = function (developerData) {
        var developer = new Model_DeveloperDescription();
        developer.setData(developerData);
        me.developers.push(developer);
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

    me.getIndex = function (developerId) {
        for (var i = 0; i < me.developers.length; i++) {
            if (me.developers[i].developerId == developerId) {
                return i;
            }
        }
        return false;
    };

};