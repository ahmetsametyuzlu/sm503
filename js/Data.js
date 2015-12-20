'use strict';

var DataStorage = function () {

    var me = this;

    me.data = {};

    /**
     * Retrieve a value for data object
     * @string key Key to retrieve
     * @param defaultValue Default value if key does not exist
     * @returns {*}
     */
    me.get = function (key, defaultValue) {
        if (me.data[key]) {
            return me.data[key];
        } else {
            return defaultValue;
        }
    };

    /**
     * Set a value for data object
     * @string key
     * @param value
     */
    me.set = function (key, value) {
        // Set data value to key.
        me.data[key] = value;
        // Save current data after every set.
        //me.save();
        // Return for the data object for chaining.
        return me;
    };

    /**
     * Get data object from local storage
     */
    me.init = function () {
        var data = localStorage.getItem('data');
        if (data !== null) {
            me.data = JSON.parse(data);
        } else {
            me.data = {
                Developers: [],
                Projects: []
            };
        }
        return me;
    };

    /**
     * Save data object to local storage
     */
    me.save = function () {
        //JSON.serializeToString()
        localStorage.setItem('data', JSON.stringify(me.data));
    };

    /**
     * Clear all data from system
     */
    me.clear = function () {
        localStorage.removeItem('data');
        me.init();
    };

};

var Data = new DataStorage().init();