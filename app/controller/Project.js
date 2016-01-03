'use strict';

Controller.Project = function () {

    var me = new Controller.Abstract();

    me.view.project = null;

    me.model.projectList = null;
    me.model.phaseList = null;
    me.model.iterationList = null;
    me.model.workItemList = null;

    me.setProjectView = function (projectView) {
        projectView.setProjectListModel(me.model.projectList);
        projectView.setPhaseListModel(me.model.phaseList);
        projectView.setIterationListModel(me.model.iterationList);
        projectView.setWorkItemListModel(me.model.workItemList);
        me.view.project = projectView;
    };

    me.setProjectListModel = function (projectListModel) {
        me.model.projectList = projectListModel;
    };

    me.setPhaseListModel = function (phaseListModel) {
        me.model.phaseList = phaseListModel;
    };

    me.setIterationListModel = function (iterationListModel) {
        me.model.iterationList = iterationListModel;
    };

    me.setWorkItemListModel = function (workItemListModel) {
        me.model.workItemList = workItemListModel;
    };

    me.init = function () {
        // Set model(s)
        me.setProjectListModel(Model.ProjectList.getInstance());
        me.setPhaseListModel(Model.PhaseList.getInstance());
        me.setIterationListModel(Model.IterationList.getInstance());
        me.setWorkItemListModel(Model.WorkItemList.getInstance());
        // Set view
        me.setProjectView(new View.Project());
        // Add listeners
        me.addListeners();
    };

    me.addListeners = function () {
        // Project List
        $(document).on('click', 'a[data-page="project-list"]', function (e) {
            me.view.project.renderList();
        });

        // Project Create
        $(document).on('click', 'a[data-page="project-create"]', function (e) {
            me.view.project.renderCreate();
        });

        // Project Edit
        $(document).on('click', 'a[data-page="project-edit"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.project.renderEdit(projectId);
        });

        // Project Detail
        $(document).on('click', 'a[data-page="project-detail"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.project.renderDetail(projectId);
        });

        // Project Plan
        $(document).on('click', 'a[data-page="project-plan"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            me.view.project.renderPlan(projectId);
        });

        // Project Form Submit
        $(document).on('click', 'button[data-form-action="project-submit"]', function (e) {
            var form = $(this).closest('form');
            var disabled = form.find("[disabled]");
            disabled.prop('disabled', false);

            var data = form.serializeArray();
            var dataObj = {};
            for (var i = 0; i < data.length; i++) {
                dataObj[data[i].name] = data[i].value;
                if (data[i].value == '') {
                    bootbox.alert('All the fields are required. Fill them! ');
                    disabled.prop('disabled', true);
                    return false;
                }
            }

            if (me.model.projectList.getIndex(dataObj.projectId) !== false) {
                me.model.projectList.update(dataObj.projectId, dataObj);
            } else {
                me.model.projectList.create(dataObj);
                me.model.phaseList.generateForProject(dataObj.projectId);
                me.model.iterationList.generateForPhases(me.model.phaseList.getListByProjectId(dataObj.projectId));
            }

            me.view.project.renderList();
        });

        // Project Delete
        $(document).on('click', 'a[data-page="project-delete"]', function (e) {
            var projectId = parseInt($(this).data('project-id'));
            bootbox.confirm('Are you sure to delete this project with all related data?', function (d) {
                if (d) {
                    me.model.projectList.delete(projectId);
                    me.view.project.renderList();
                }
            });
        });
    };

    return me;

};