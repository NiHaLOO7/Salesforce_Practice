({	
    doInit : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Name', fieldName: 'name', type: 'text'},
            {label: 'Date', fieldName: 'date', type: 'text'},
            {label: 'Email', fieldName: 'email', type: 'email'},
            {label: 'Contact Phone', fieldName: 'phone', type: 'phone'}
        ]);
    },
    
    onCertificationIdChange : function(component, event, helper) {
        helper.refreshData(component);
    },
    
    onCertActions : function(component, event, helper) {
        var action = event.getSource().getLocalId();
        var selections = component.find('datatable').getSelectedRows();
        var selectedIds = [];
        selections.forEach( row => {
            selectedIds.push(row.certificationHeldId);
        });
            
            switch(action){
            case 'btnEmail' :
            helper.notAvailable(component);
            break;
            case 'btnSendCert' :
            helper.notAvailable(component);
            break;
            case 'btnDelete' : 
            helper.onDelete(component, selectedIds);
            break;
        }
                           },
                           
                           onRowSelection : function(component, event, helper) {
            helper.enableActionButtons(
                component, 
                event.getParam('selectedRows').length > 0
            );
        }
            
    })