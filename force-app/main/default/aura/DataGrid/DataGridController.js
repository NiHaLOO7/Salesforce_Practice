({
    doInit : function(component, event, helper) {
        helper.onInit(component);
    },
    
    setSelection : function(component, event, helper) {
        component.find('datagridtable')
        .setSelection(event.getParam('arguments').Id);
    }
})