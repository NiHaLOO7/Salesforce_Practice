({
    onContactIdChange : function(component, event, helper) {
        helper.getCertificationsForStudent(component);
    },
    
    doInit : function(component, event, helper) {
        helper.getCertificationsForStudent(component);
    }
})