'use strict';

var Main = function () {

    var me = this;

    me.init = function () {
        // Data.clear();

        // Controllers
        new Controller_Home().init();
        new Controller_Credit().init();
        new Controller_Developer().init();
        new Controller_Project().init();

        // Default actions
        $(document).on('click', 'a[data-page], button[data-form-action]', function (e) {
            e.preventDefault();
        });

        // Save before closing, reloading the browser
        window.onbeforeunload = function () {
            me.save();
        };
    };

    //me.save = function () {
    //    var projects = [];
    //    for (var i = 0; i < me.projectModel.projects.length; i++) {
    //        projects.push(me.projectModel.projects[i].getData());
    //    }
    //    Data.set('projects', projects);
    //
    //    var developers = [];
    //    for (var i = 0; i < me.developerModel.developers.length; i++) {
    //        developers.push(me.developerModel.developers[i].getData());
    //    }
    //    Data.set('developers', developers);
    //    Data.save();
    //};

};

// Start it all
new Main().init();
