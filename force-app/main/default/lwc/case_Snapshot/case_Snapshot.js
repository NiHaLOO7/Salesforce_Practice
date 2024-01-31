import { LightningElement, wire, api, track } from "lwc";
import getCasesinfo from "@salesforce/apex/SnapshotController.getCasesinfo";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import STATUS_FIELD from "@salesforce/schema/Case.Status";
import TYPE_FIELD from "@salesforce/schema/Case.Case_Type__c";
import Account_Name from "@salesforce/schema/Case.Account_ID__c";



export default class FilteredTable extends NavigationMixin(LightningElement) 
{
    
    
    @track a='';
    @track errorMsg = '';
    @track data;
    searchable = [];
    wiredCases;
    doneTypingInterval = 0;
    statusPickListValues;
    anmPickListValues;
    caseTypePickListValues;
    searchAllValue;
    Anm = null;
    status = null;
    typu=null;
    


    @wire(getCasesinfo, {

        Anm: "$Anm",
        status: "$status",
        typu: "$typu",
        errorMsg:"$errorMsg"
        
    })
    

    wiredSObjects(result) {
        console.log("wire getting called");
        this.wiredCases = result;
        
        if (result.data) {
            
            this.searchable = this.data = result.data.map((caseObj, index) => ({
                caseData: { ...caseObj },
                index: index + 1,
                rowIndex: index

                
            }));


           
           this.a=result.data.toString();
           if(this.a)
           {
            this.errorMsg='';
           }
           else
           {
            this.errorMsg="NO CASE RECORDS FOUND";

           }
            



        }
        
    

        
        


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
        fieldApiName: Account_Name
    })
    anmPickLists({ error, data }) {
        if (error) {
            console.error("error", error);
            
        } else if (data) {
            this.anmPickListValues = [
                { label: "", value: null },
                ...data.values
            ];
        }
    }
    
    

    @wire(getPicklistValues, {
        recordTypeId: "012000000000000AAA",
        fieldApiName: TYPE_FIELD
    })
    caseTypePickLists({ error, data }) {
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

    }



    clearSearch() {
        this.status = null;
        this.Anm= null;
        this.typu=null;
        this.searchable = "";
        this.searchAllValue = "";
        this.errorMsg='';

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