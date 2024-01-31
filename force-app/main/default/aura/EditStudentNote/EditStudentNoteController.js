({
    handleCourseAttendeeChange : function(component, event, helper) {
        // Reloading the component to refresh the notes based on selected course attendee
        component.find('recordEditor').reloadRecord();
    },
    
    saveInstructorNoteChange: function(component, event, helper) {
        component.find("recordEditor").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log("Firing studentNoteChangeEvent");
                var studentNoteChangeEvent = component.getEvent("studentNoteChangeEvent");
                studentNoteChangeEvent.fire();
                
                helper.showToast(component,'','Record Saved','Huzzah!','success');
                
            } else if (saveResult.state === "INCOMPLETE") {
                helper.showNotification(component,'','Ooops','User is offline, device doesn\'t support drafts.','warning');      
            } else if (saveResult.state === "ERROR") {
                helper.showNotification(component,'','Problem saving record',JSON.stringify(saveResult.error),'error');      
                
            } else {
                helper.showNotification(component,'','Unknown problem','state' +  saveResult.state + ', error: ' + JSON.stringify(saveResult.error),'error');      
            }
        }));}
    
})