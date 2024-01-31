({
    onInit : function(component) {
         this.callServer(
            component,
            "c.getAll",
            function(response) {  
                for (var i=0; i<response.length; i++) {
                  response[i].InstructorName = response[i].Instructor__r.Name;
                }
              component.set('v.tripReports',response);
            }
        );  
    }
})