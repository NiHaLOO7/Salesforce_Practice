({
	doInit : function(component, event, helper) {
		helper.callServer(
            component,
            "c.getCertifications",
            function(response){
                component.set('v.certifications', response);
            },
            null,
            false
        );
	}
})