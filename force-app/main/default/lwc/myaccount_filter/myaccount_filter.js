import { LightningElement, track, api, wire} from 'lwc';
//import STATUS_FIELD from "@salesforce/schema/Case.Status";
//import SUB_CAT from "@salesforce/schema/Case.Sub_Category_Type__c";
//import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getAccountData from '@salesforce/apex/AccountSearch.getAccountData'; 

//metadata class and method
import fetchMetaListLwc from '@salesforce/apex/lwcCustomMetaDataCtrl.fetchMetaListLwc';
//metadata columns
const COLUMNS = [
  //  { label: 'Label', fieldName: 'MasterLabel' },
    { label: 'Question', fieldName: 'Instructions__c' },
];

export default class Account_filter extends LightningElement {
    //Metadata variables
    records;
    wiredRecords;
    error;
    columns = COLUMNS;
    draftValues = [];
    //till here
 doneTypingInterval = 0;   
 value = ['option1'];
 @track caseList = false;
 @track accountList;
 typu=null; 
 cat=null;
 caseTypePickListValues;
 showspinner=false;


 // added as new 
 searchKey;
 @track accounts;  
 @api recordId;

 cols = [
     {label:'Account Name', fieldName:'Name' , type:'text'} ,
     {label:'Phone', fieldName:'Phone' , type:'Phone'} ,
     {label:'Industry', fieldName:'Industry' , type:'text'}
           
 ]   









    get options() {
        return [
            { label: 'Not Consumer', value: 'option1' },
            
        ];
    }

    handleOnChange(e) {
        this.value = e.detail.value;
    }
    
    handleOnSearch(event) {
    clearTimeout(this.typingTimer);
        let value = event.target.value;
        let name = event.target.name;

        this.typingTimer = setTimeout(() => {
            this[name] = value;
            this.accountList = this[name];
        }, this.doneTypingInterval);
    }

    handleOnChange(event) {
        this[event.target.name] = event.target.value;
        console.log("change", this[event.target.name]);
    }

      /*  @wire(getPicklistValues, {
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
    }*/

    @wire( fetchMetaListLwc )  
    wiredRecs( value ) {
        this.wiredRecords = value;
        const { data, error } = value;
        if ( data ) {
                       
            this.records = data;
            this.error = undefined;
        } else if ( error ) {
            this.error = error;
            this.records = undefined;
        }
    }

    SearchAccountHandler(){
        //call Apex method.
        getAccountData({textkey: this.searchKey})
        .then(result => {
                this.showTableData = true;
                this.accounts = result;
        })
        .catch( error=>{
            this.accounts = null;  
            this.showTableData = false;
        }); 
    } 

    handelSearchKey(event){
        this.searchKey = event.target.value;
    } 

   
    handleSubmit(event) {
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
    }
    handleSuccess(event) {
        this.isShowModal = false;  
        console.log('onsuccess event recordEditForm', event.detail.id);
            const evt = new ShowToastEvent({
                title: 'Success',
                message: 'The case is created successfully.', 
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);    
            window.location.reload();        
    }

    handleReset(event) {
        this.isShowModal = false; 
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset(); 
            });
        }


        console.log('onsuccess event recordEditForm', event.detail.id);
        const evt = new ShowToastEvent({
            title: 'Warning',
            message: 'The action was cancelled',    
            variant: 'Warning',
            mode: 'dismissable' 
        });
        this.dispatchEvent(evt);
     }  


     @track isShowModal = true; 
     @track showTableData = false;
 
    showModalBox() {   
        this.isShowModal = true;
    }

  /*  hideModalBox() {  
        this.isShowModal = false;
    }  */  


    activeSections = ['A', 'B'];  
    activeSectionsMessage = ''; 
 
    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }

}