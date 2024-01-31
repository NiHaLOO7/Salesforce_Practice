({
    onInit : function(component, event, helper) {
        helper.callServer(
            component,
            "c.getInstructors",
            function(response){
                component.set('v.instructors', response);
                console.log(component.get('v.instructors'));
            },
            null,
            true
        );
        
    },
    
    onFilterChange : function(component, event, helper) {
        console.log('Selected Delivery ---> ' +  component.get('v.selectedDeliveryId'));
        var e = component.getEvent('onStudentFilterChange');
        e.setParams(
            {
                instructorId: component.get('v.selectedInstructorId'),
                courseDeliveryId: component.get('v.selectedDeliveryId')
            }
        );
        e.fire();
    }
})