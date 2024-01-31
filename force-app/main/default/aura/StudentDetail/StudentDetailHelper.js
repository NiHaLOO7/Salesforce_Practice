({
	queryCourseAttendees : function(component, helper){
        helper.callServer(component,
                          "c.getCourseAttendees",
                          function(response){
                              component.set('v.history', response);
                              console.log('Course Attendees history : ' + JSON.stringify(component.get('v.history')));
                          }, {
                              studentId : component.get('v.contactId')
                          }
                         );
    }
})