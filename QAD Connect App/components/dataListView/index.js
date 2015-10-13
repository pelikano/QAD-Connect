'use strict';

app.dataListView = kendo.observable({
    domainCode: '',
    entityCode: '',
    onShow: function() {},
    afterShow: function() {},
    listShow: function(e) {
        app.dataListView.set('domainCode', e.view.params.domainCode);
        app.dataListView.set('entityCode', e.view.params.entityCode);
   	}
});

// START_CUSTOM_CODE_dataListView
// END_CUSTOM_CODE_dataListView
(function(parent) {
    var dataProvider = app.data.notificationList,
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
                data: 'data',
                model: {
                    id: 'notificationId',
                    fields: {                        
                        'urlText': {
                            field: 'urlText',
                            defaultValue: ''
                        },
               			'text': {
                            field: 'text',
                            defaultValue: ''
                        },
            			'timestamp': {
                            field: 'timestamp',
                            defaultValue: ''
                        }                         
                    }
                }
            },
        },
        dataSource = new kendo.data.DataSource(dataSourceOptions),
        dataListViewModel = kendo.observable({
            dataSource: dataSource,
            itemClick: function(e) {
                app.mobileApp.navigate('#components/dataListView/details.html?uid=' + e.dataItem.uid);
            },
            detailsShow: function(e) {
                var item = e.view.params.uid,
                    dataSource = dataListViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);
                dataListViewModel.set('currentItem', itemModel);
            },
            currentItem: null
        });

    var dataSourceOptions = dataListViewModel.dataSourceOptions;
    
    parent.set('dataListViewModel', dataListViewModel);
})(app.dataListView);

// START_CUSTOM_CODE_dataListViewModel
// END_CUSTOM_CODE_dataListViewModel