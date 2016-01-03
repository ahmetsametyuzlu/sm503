'use strict';

var Main = function () {

    var me = this;

    me.init = function () {
        // Data.clear();

        // Controllers
        new Controller.Home().init();
        new Controller.Credit().init();
        new Controller.Developer().init();
        new Controller.Project().init();
        new Controller.Phase().init();
        new Controller.WorkItem().init();
        new Controller.Iteration().init();
        new Controller.Layout().init();

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

        var projectModel = Model.ProjectList.getInstance();
        var developerModel = Model.DeveloperList.getInstance();
        var phaseModel = Model.PhaseList.getInstance();
        var iterationModel = Model.IterationList.getInstance();
        var workItemModel = Model.WorkItemList.getInstance();

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

        var phases = [];
        for (var i = 0; i < phaseModel.phases.length; i++) {
            phases.push(phaseModel.phases[i].getData());
        }
        Data.set('phases', phases);

        var iterations = [];
        for (var i = 0; i < iterationModel.iterations.length; i++) {
            iterations.push(iterationModel.iterations[i].getData());
        }
        Data.set('iterations', iterations);

        var workItems = [];
        for (var i = 0; i < workItemModel.workItems.length; i++) {
            workItems.push(workItemModel.workItems[i].getData());
        }
        Data.set('workItems', workItems);

        // Save data to local storage.
        Data.save();

    };

};

// Start it all
new Main().init();
