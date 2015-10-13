'use strict';

app.homeView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_homeView
// END_CUSTOM_CODE_homeView
(function(parent) {
    var dataProvider = app.data.workspaceList,
        dataSourceOptions = {
            type: 'json',
            transport: {
                read: {
                    type: "GET",
            		headers: {"Authorization" : "Basic " + btoa("mfg:")},
                    url: dataProvider.url
                }
            },
            schema: {
                data: 'data.workspaceNotifications',
                model: {
                    id: 'workspaceName',
                    fields: {
                        'headerTitle': {
                            field: 'headerTitle',
                            defaultValue: ''
                        },
                        'unreadNotifications': {
                            field: 'unreadNotifications',
                            defaultValue: 0
                        }
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        homeViewModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/dataListView/view.html?domainCode=' + e.dataItem.domainCode + '&entityCode=' + e.dataItem.entityCode);
            }
        });

    parent.set('homeViewModel', homeViewModel);
})(app.homeView);

// START_CUSTOM_CODE_homeViewModel
// END_CUSTOM_CODE_homeViewModel