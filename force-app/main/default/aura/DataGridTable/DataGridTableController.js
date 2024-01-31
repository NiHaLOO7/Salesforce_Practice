({
    onRowClick : function(component, event, helper) {
        var target = event.currentTarget;
        helper.setSelectedRow(component, target);
        
        var compEvent = component.getEvent('rowclick');
        compEvent.setParams({
            pk : target.getAttribute('data-pk'),
            domEl : target
        });
        compEvent.fire();
    },
    
    onRowDblClick : function(component, event, helper) {
        
        var target = event.currentTarget;
        var pk = target.getAttribute('data-pk');
        var data = component.get('v.rows');
        
        // convert data from array to object
        var rec = {};
        for (var i=0; i<data.length; i++) {
            if (data[i].pk == pk) {
                var dataFields = data[i].data;
                for (var j=0; j<dataFields.length; j++ ) {
                    rec[dataFields[j].label] = dataFields[j].value;
                }
                break;
            }             
        }
         
        var compEvent = component.getEvent("rowdblclick");
        compEvent.setParams({
            pk : target.getAttribute('data-pk'),
            rec: rec
        });
        compEvent.fire();
        
    },
    
    setSelection : function(component, event, helper) {
        var params = event.getParam('arguments');
        var pk = params.Id;
        var targets = component.find("datarow");
        for(var i=0; i<targets.length; i++){
            if(targets[i].getElement().getAttribute('data-pk') == pk){
                helper.setSelectedRow(component, targets[i]);
                break;
            }
        }
    }
})