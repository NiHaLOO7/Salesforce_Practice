({
    
    doInit : function(component, event, helper) {
        helper.onInit(component, event, helper);
    },
    
    onInstructorChange : function(component, event, helper) {
        component.set('v.selectedDeliveryId','');
        console.log(component.get('v.selectedInstructorId'));
        if (component.get('v.selectedInstructorId') != ''){
            helper.callServer(
                component,
                "c.getDeliveriesByInstructorId",
                function(response){
                    console.log("onInstructorChange function");
                    component.set('v.deliveries', response);
                },
                {
                    instructorId : component.get('v.selectedInstructorId')
                },
                false
            );
        } else{
            component.set('v.deliveries', []);
        }
        helper.onFilterChange(component);
    },
    
    onFilterChange : function(component, event, helper) {
        helper.onFilterChange(component);
    },
    
    onAddNewDelivery : function(component, event, helper) {
        var evt = $A.get("event.force:createRecord");
        if (evt){
            evt.setParams({
                entityApiName : 'Course_Delivery__c',
                defaultFieldValue: {
                    Instructor__c : component.get('v.selectedInstructorId')
                }
            });
            evt.fire();
        } else{
            alert("Feature Not Available")
        }
    }
    
    
})