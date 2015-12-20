'use strict';

var Main = function () {

    var me = this;

    me.init = function () {

        //Data.clear();

        // Models
        me.creditModel = new Model_Credit();

        me.projectModel = new Model_Project();
        me.projectModel.init(Data.get('projects', []));

        me.developerModel = new Model_Developer();
        me.developerModel.init(Data.get('developers', []));

        // Ui's
        me.homeUi = new Ui_Home();
        me.homeUi.init();
        me.homeUi.render();

        me.creditUi = new Ui_Credit();
        me.creditUi.setCreditModel(me.creditModel);
        me.creditUi.init();

        me.developerUi = new Ui_Developer();
        me.developerUi.setDeveloperModel(me.developerModel);
        me.developerUi.setProjectModel(me.projectModel);
        me.developerUi.init();

        me.projectUi = new Ui_Project();
        me.projectUi.setProjectModel(me.projectModel);
        me.projectUi.init();

        // Save before closing, reloading the browser
        window.onbeforeunload = function () {
            me.save();
        };
    };

    me.save = function () {
        var projects = [];
        for (var i = 0; i < me.projectModel.projects.length; i++) {
            projects.push(me.projectModel.projects[i].getData());
        }
        Data.set('projects', projects);

        var developers = [];
        for (var i = 0; i < me.developerModel.developers.length; i++) {
            developers.push(me.developerModel.developers[i].getData());
        }
        Data.set('developers', developers);
        Data.save();
    };

};

// Start all the staff
new Main().init();
