({
	getCertificationsForStudent : function(component) {
		this.callServer(
            component,
            "c.getCertificationsForStudent",
            function(response){
                component.set('v.certs', response);
                console.log('Certifications ---> ' + JSON.stringify(component.get('v.certs')));
            },
            {	
                contactId : component.get('v.contactId')
            },
            false
        );
	}
})