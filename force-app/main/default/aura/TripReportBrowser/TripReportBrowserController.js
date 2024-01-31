({
    doInit : function(component, event, helper) {
        helper.onInit(component);
    },
    
    onDataGridClick: function(component,event,helper) {
        component.set('v.selectedRecordId',event.getParam('pk'));
    },
    
    onBtnEditClick: function(component,event,helper) {
        var compEvent = component.getEvent("ontripreportmodechange");
        compEvent.setParams({ 
            "mode" : "edit",
            "Id" : component.get('v.selectedRecordId')
        });
        compEvent.fire(); 
    },
    
    onBtnNewClick : function(component, event, helper) {
        var compEvent = component.getEvent("ontripreportmodechange");
        compEvent.setParams({ "mode" : "add" });
        compEvent.fire();
    }
})