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
    //        data: :[{"notificationId":"f27c3537-9c99-4132-8965-f4448d52b8c3","type":"1","read":false,"hidden":false,"urlText":"SalesOrder SO101 ","url":"","urlDisable":false,"text":"INBOX_NOTIFICATION_FIELD_CHANGE_ADDED_FIELD","timestamp":"2015-09-22T10:19:10.948Z"},
// {"notificationId":"8f8a83b7-31b0-4628-afe2-dc8b663d0072","type":"1","read":false,"hidden":false,"urlText":"SalesOrder SO101 ","url":"","urlDisable":false,"text":"created by <span class='inboxboldText'>mfg</span>.","timestamp":"2015-09-22T10:18:42.927Z"},
// {"notificationId":"ef580ccf-9516-4596-9258-9afc95fd39b4","type":"1","read":false,"hidden":false,"urlText":"SalesOrder SO100 ","url":"","urlDisable":false,"text":"<span class='inboxboldText'>mfg</span> updated Discount % from '15' to '11'.","timestamp":"2015-09-22T09:30:01.283Z"},
// {"notificationId":"5a3e0915-a1ec-4f83-93bc-ba86f6e71bc3","type":"1","read":false,"hidden":false,"urlText":"SalesOrder SO100 ","url":"","urlDisable":false,"text":"<span class='inboxboldText'>mfg</span> updated Discount % from '33' to '15'.","timestamp":"2015-09-22T09:14:08.165Z"},
// {"notificationId":"2cc2bf7d-0de6-4bd9-815e-899af8dbfba0","type":"6","read":false,"hidden":false,"urlText":"SalesOrder SO100 ","url":"","urlDisable":false,"text":"<span class='inboxboldText'>Elma Kane</span> replied to your comment: \"seuui\".","timestamp":"2015-09-02T15:13:02.561Z"},
// {"notificationId":"e94fe720-a3ce-4442-89cc-2a25b5724c23","type":"12","read":false,"hidden":false,"urlText":"SalesOrder SO100 ","url":"","urlDisable":false,"text":"<span class='inboxboldText'>Elma Kane</span> commented on your activity: \"ping!!\"","timestamp":"2015-09-02T15:12:16.934Z"}],
			
			transport: {
                read: {
                type: "GET",
                data: {'domainCode': 'Domain1', 
                          'entityCode': '1000' },
           		headers: {"Authorization" : "Basic " + btoa('mfg:')},
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