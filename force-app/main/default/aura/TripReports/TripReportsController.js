({
	onTripReportModeChange : function(component, event, helper) {
		component.set('v.mode', event.getParam('mode'));
        component.set('v.selectedTripReportId', event.getParam('Id'));  
        console.log(event.getParam('mode') + '---->'  + event.getParam('Id'))
	}
})