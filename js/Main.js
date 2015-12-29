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

    me.save = function () {
        var projectModel = Model_Project.getInstance();
        var developerModel = Model_Developer.getInstance();

        var projects = [];
        for (var i = 0; i < projectModel.projects.length; i++) {
            projects.push(projectModel.projects[i].getData());
        }
        Data.set('projects', projects);

        var developers = [];
        for (var i = 0; i < developerModel.developers.length; i++) {
            developers.push(developerModel.developers[i].getData());
        }
        Data.set('developers', developers);
        Data.save();
    };

};

// Start it all
new Main().init();
