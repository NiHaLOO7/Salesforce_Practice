import { LightningElement, wire, api, track } from "lwc";
import getCases from "@salesforce/apex/ats_FilteredTableController.getCases";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import TYPE_FIELD from "@salesforce/schema/Case.Case_Type__c";
import SUB_CAT from "@salesforce/schema/Case.Sub_Category_Type__c";








export default class Case_Filter extends NavigationMixin(LightningElement) 
{
    




    @track readOnlyBool=false;
    @track readOnlyBool2=true;

    statusPickListValues;
    categoryPickListValues;
    caseTypePickListValues;

    casenumber = "";
    accountname = "";
    contactname = "";
    rst=true;
    cat = null;
    status = null;
    typu="Generic";




    @wire(getPicklistValues, {
        recordTypeId: "012000000000000AAA",
        fieldApiName: STATUS_FIELD
    })
    statusPickLists({ error, data }) {
        if (error) {
            console.error("error", error);
            
        } else if (data) {
            this.statusPickListValues = [
                { label: "", value: null },
                ...data.values
            ];
        }
        
    }

    
    @wire(getPicklistValues, {
        recordTypeId: "012000000000000AAA",
        fieldApiName: SUB_CAT
    })
    categoryPickListPickLists({ error, data }) {
        if (error) {
            console.error("error", error);
            
        } else if (data) {
            this.categoryPickListValues = [
                { label: "", value: null },
                ...data.values
            ];
        }
    }
    
    

    @wire(getPicklistValues, {
        recordTypeId: "012000000000000AAA",
        fieldApiName: TYPE_FIELD
    })
    caseTypePickListValues({ error, data }) {
        if (error) {
            console.error("error", error);
            
        } else if (data) {
            
            this.caseTypePickListValues = [
                { 
                label: "", value: null },
                ...data.values
            ];
        }
    }
    



    
    handleChange(event) {
        this[event.target.name] = event.target.value;
        console.log("change", this[event.target.name]);
        this.readOnlyBool=false;
        this.rst=true;
        
    }

    handleKeyUp(event) {
        clearTimeout(this.typingTimer);
        let value = event.target.value;
        let name = event.target.name;

        this.typingTimer = setTimeout(() => {
            this[name] = value;
        }, this.doneTypingInterval);
        this.readOnlyBool2=false;
        this.rst=true;
    }

    clearSearch() {
        this.casenumber = "";
        this.accountname = "";
        this.contactname = "";
        this.status = null;
        this.cat= null;
        this.typu=null;
        this.readOnlyBool=true;
        this.readOnlyBool2=true;
        this.rst=false;
    }

 
    handleNavigate(event) {
        event.preventDefault();
        this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
                actionName: "view",
                recordId: event.target.dataset.id
                
            }
        });

        
    }


    
    
}