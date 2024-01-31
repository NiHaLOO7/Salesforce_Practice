({
    
    onChangeId: function(component) {
        
        var Id = component.get('v.Id');
        var recordOps = component.find("recordOps");
        if (recordOps && recordOps.getNewRecord && (Id == '' || !Id)) {
            recordOps.getNewRecord(
                "TripReport__c", // sObject type (objectApiName)
                null,      // recordTypeId
                false,     // skip cache?
                $A.getCallback(function() {
                    var rec = component.get("v.objReport");
                    var error = component.get("v.objReportError");
                    if(error || (rec === null)) {
                        console.log("Error initializing record: " + error);
                        return;
                    }
                    console.log("Record initialized: ",rec);
                })
            );
        }
    },
    
    onInit: function(component) {
        this.callServer(
            component,
            "c.getInstructors",
            function(response) {          
                component.set('v.instructors', response);
            } // function
        ); // callserver
        
        this.callServer(
            component,
            "c.getLocationTypes",
            function(response) {    
                var opts = [];
                for (var i=0; i<response.length; i++) {
                    opts.push({
                        label: response[i],
                        value: response[i]
                    });
                }
                component.set('v.reviewOptions',opts);
            } // function
        ); // callserver
        
        this.onChangeId(component);
    },
    
    validateFields : function(component){
        var field = null;
        var fields = component.get('v.validateFields');
        fields = fields.split(',');
        var validity = null;
        var result = true;
        
        for(var i=0; i<fields.length; i++){
            field = component.find(fields[i]);
            validity = field.get('v.validity');
            if(typeof validity == 'object'){
                if(validity.badInput || 
                   validity.patternMismatch || 
                   validity.rangeOverflow || 
                   validity.rangeUnderflow || 
                   validity.tooLong || 
                   validity.typeMismatch || 
                   validity.valueMissing ){
                    result = false;
                }
            }
        }
        return result;
    }
    
})