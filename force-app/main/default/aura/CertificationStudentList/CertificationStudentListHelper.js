({
    enableActionButtons : function(component, mode) {
        mode = !mode;
        component.find('btnEmail').set('v.disabled', mode);
        component.find('btnSendCert').set('v.disabled', mode);
        component.find('btnDelete').set('v.disabled', mode);
    },
    
    onDelete : function(component, selectedIds) {
        this.callServer(
            component,
            "c.deleteStudentCertification",
            function(response){
                this.refreshData(component);
            },
            {
                certificationIds : selectedIds
            }
        );
    },
    
    refreshData : function(component) {
        this.callServer(
            component,
            "c.getCertifiedStudents",
            function(response){
                let aData = [];
                for(let i=0; i<response.length; i++){
                    let rec = response[i];
                    aData.push({
                        certificationHeldId : rec.Id,
                        contactId : rec.Certified_Professional__r.Id,
                        name : rec.Certified_Professional__r.Name,
                        date : rec.Date_Achieved__c ,
                        email : rec.Certified_Professional__r.Email,
                        phone : rec.Certified_Professional__r.MobilePhone
                    });
                }
                component.set('v.contacts', aData);
            },
            {
                certificationId : component.get('v.certificationId')
            }
        );
    },
    
    notAvailable : function(component) {
        this.showNotification(
        component,
            "Not Available",
            "",
            $A.get("$Label.c.Feature_Not_Available")
        );
    }
})