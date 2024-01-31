({
    doInit : function(component, event, helper) {
        helper.onInit(component);
    },
    
    onChangeId: function(component,event,helper) {
        helper.onChangeId(component);  
    },
    
    onSave: function(component,event,helper) {
        
        var service = component.find("recordOps");
        
        var obj = component.get('v.objReportFields');
        
        // lightning:radioGroup sometimes encodes the value in an array
        // so we need to convert the array value to a simple value 
        // before saving
        if (Array.isArray(obj.ReviewType__c) && obj.ReviewType__c.length == 1 ) {
            obj.ReviewType__c = obj.ReviewType__c[0];
            component.set('v.objReportFields',obj);
        }
        
        
        service.saveRecord(function(saveResult) {
            
            if (saveResult.state === "SUCCESS" || 
                saveResult.state === "DRAFT") {
                
                // record is saved successfully
                
                helper.showToast(component,"Transaction Complete","Your Trip Report was Saved.",null,"success");
                
                
                var compEvent = component.getEvent("ontripreportmodechange");
                compEvent.setParams({"mode" : "view", "id" : component.get('v.Id') });
                compEvent.fire();   
                
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                component.set('v.objReportError','User is offline, device doesn\'t support drafts.');                    
            } else if (saveResult.state === "ERROR") {
                component.set('v.objReportError','Problem saving record, error: ' + JSON.stringify(saveResult.error));             
            } else {
                alert('Unknown problem, state: ' + saveResult.state);
            }
        });
    },
    
    onCancel: function(component,event,helper) {
        var compEvent = component.getEvent("ontripreportmodechange");
        compEvent.setParams({ "mode" : "view" });
        compEvent.fire();
    },
    
    onBlur: function(component,event,helper) {
        if(helper.validateFields(component)){
            component.find('btnSubmit').set('v.disabled', false);
        } else{
            component.find('btnSubmit').set('v.disabled', true);
        }
    }
})