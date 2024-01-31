({
    onStudentClick : function(component, event, helper) {
        // alert(component.get('v.student').Name);
        var student = component.get('v.student');
        console.log('Name', student.Name);
        console.log('Photo', student.PhotoUrl);
        var event = component.getEvent('onStudentSelected');
        event.setParams(
            {
                contactId:student.Id
            }
        );
        event.fire();
    }
})