({
    
    onNavSelect: function(component,event,helper) {
        
        var selectionName = event.getParam('name');
        if (selectionName == 'students') {
            //setting viewmode to empty to refresh the view StudentBrowser and StudentDetail component alone
            component.set('v.viewMode','');
            component.set('v.viewMode','students');
        } else if (selectionName == 'tripreports') {
            //setting viewmode to empty to refresh the view TripReports component alone
            component.set('v.viewMode','');
            component.set('v.viewMode','tripreports');
        } else {
            component.set('v.viewMode','certifications');
            var key = selectionName.split(',');
            component.set('v.certificationId',key[0]);
            component.set('v.certificationLabel',key[1]);
        }
    },
    
    doInit: function(component,event,helper) {
        
        helper.showToast(
            component,
            "Welcome",
            "Don't forget to check back here for updated class schedules and assignments"
        );  
    },
    
    onNotification: function(component,event,helper) {
        
        var notifService = component.find('notifLib');
        var config = event.getParam('config');
        if (event.getParam('type') == 'toast') {
            notifService.showToast(config);
        } else { 
            // notification
            notifService.showNotice(config);
        }
    },
    
    spinnerShow : function (component, event, helper) {
        var m = component.find('modalspinner');
        $A.util.removeClass(m, "slds-hide");
    },
    
    spinnerHide : function (component, event, helper) {
        var m = component.find('modalspinner');
        $A.util.addClass(m, "slds-hide");
    }
    
})