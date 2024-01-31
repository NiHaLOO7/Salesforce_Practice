import { LightningElement, wire, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import TYPE_FIELD from "@salesforce/schema/Case.Case_Type__c";
import SUB_CAT from "@salesforce/schema/Case.Sub_Category_Type__c";




export default class Case_Snapshot_Parent extends NavigationMixin(LightningElement) 
{
    
   
    statusPickListValues;
    categoryPickListValues;
    caseTypePickListValues;
    cat = null;
    status = null;
    typu=null;
    rst=false;
    value='';
    get options() {
        return [
            { label: 'Under SLA', value: 'NO' },
            { label: 'Over SLA', value: 'YES' },
        ];
    }



    

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
        this.rst=true;
        
    }

    handleslachange(event){
        this.value = event.target.value;
        if(this.value)
        {this.value=this.value.toString();}
        else{

        this.value=null;
        }
        this.rst=true;
    }






    clearSearch() {
        this.status = null;
        this.cat= null;
        this.typu=null;
        this.value=null;
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