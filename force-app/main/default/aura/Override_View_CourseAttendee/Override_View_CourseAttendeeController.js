({
    onEdit: function(component,event,helper) {
        var e = $A.get("e.force:editRecord");
        e.setParams({
             "recordId": component.get('v.recordId')
        });
        e.fire();
    },
    
    handleRecordUpdated : function(component, event, helper) {
        var contactId =  component.get('v.contact').Student__r.Id;
        helper.callServer(
            component,
            "c.getNotesByStudent",
            function(response) {  
                var aResults = [];
                
                for (var i=0; i<response.length; i++) {
                    var obj = {
                        courseAttendeeId: response[i].Id,
                        startDate: response[i].Course_Delivery__r.Start_Date__c,
                        courseName: response[i].Course_Delivery__r.Course__r.Name
                    }
                    if (response[i].InstructorNotes__c) {
                        obj.instructorNotes = response[i].InstructorNotes__c;
                    } else {
                        obj.instructorNotes = "No notes";
                    }
                    aResults.push(obj);
                }
                
                component.set('v.history',aResults);
            }, {
                contactId : contactId
            }
        ); 
    }
})