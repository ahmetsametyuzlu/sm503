'use strict';

Model.WorkItemList = (function () {

    var Object = function () {

        var me = this;

        me.workItems = [];

        me.init = function () {
            var workItems = Data.get('workItems', []);
            for (var i = 0; i < workItems.length; i++) {
                var workItem = new Model.WorkItem();
                workItem.setData(workItems[i]);
                me.workItems.push(workItem);
            }
        };

        me.create = function (workItemData) {
            var workItem = new Model.WorkItem();
            workItem.setData(workItemData);
            me.workItems.unshift(workItem);
        };

        me.update = function (workItemId, workItemData) {
            me.workItems[me.getIndex(workItemId)].setData(workItemData);
        };

        me.save = function (workItemData) {
            var workItemId = parseInt(workItemData.workItemId);
            if (me.getIndex(workItemId) !== false) {
                me.update(workItemId, workItemData);
            } else {
                me.create(workItemData);
            }
        };

        me.delete = function (workItemId) {
            me.workItems.splice(me.getIndex(workItemId), 1);
        };

        me.get = function (workItemId) {
            return me.workItems[me.getIndex(workItemId)];
        };

        me.getIndex = function (workItemId) {
            for (var i = 0; i < me.workItems.length; i++) {
                if (me.workItems[i].workItemId == workItemId) {
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