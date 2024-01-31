({
    onStudentSelected : function(component, event, helper) {
        var contactId = event.getParam('contactId');
        //var courseDeliveryId = event.getParam('courseDeliveryId');
        
        component.set('v.contactId', contactId);
        //component.set('v.courseDeliveryId', courseDeliveryId);
        //console.log(component.get('v.courseDeliveryId'));
        if(contactId != ''){
            helper.queryCourseAttendees(component,helper);
            component.find('recordLoader').reloadRecord();
            // Setting the tab id to display the body inside the tab as Default tab selection is not displaying the contents sometimes
            component.set('v.selTabId', 'historyTab');
        }
    },
    
    navigateToSObject : function(component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get('v.contactId')
        });
        navEvt.fire();
    },
    
    handleTabSelect : function(component, event, helper) {            
    },
    
     handleStudentNoteChangedEvent : function(component, event, helper) {
         helper.queryCourseAttendees(component,helper);
    }
    
})