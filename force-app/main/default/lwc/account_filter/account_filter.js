import { LightningElement, track, api, wire} from 'lwc';
//import STATUS_FIELD from "@salesforce/schema/Case.Status";
//import SUB_CAT from "@salesforce/schema/Case.Sub_Category_Type__c";
//import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";
import getAccountData from '@salesforce/apex/AccountSearch.getAccountData'; 
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import TYPE_FIELD from "@salesforce/schema/Case.Case_Type__c";
import SUB_CAT from "@salesforce/schema/Case.Sub_Category_Type__c";
import { createRecord } from 'lightning/uiRecordApi';
//metadata class and method
import fetchMetaListLwc from '@salesforce/apex/lwcCustomMetaDataCtrl.fetchMetaListLwc';
//metadata columns
const COLUMNS = [
  //  { label: 'Label', fieldName: 'MasterLabel' },
    {  fieldName: 'Question__c' , hideLabel: true, wrapText: true, hideDefaultActions: true },
];

export default class Account_filter extends NavigationMixin(LightningElement) {
    //Metadata variables
    records;
    wiredRecords;
    error;
    columns = COLUMNS;
    draftValues = [];
    //till here
    searchbuttondisabled=false;
    categoryPickListValues;
    caseTypePickListValues;
    showQuestion = false;  
    showUpload = false; 
    cat = null;
    typu=null;
    @track selectedIds;
    @track filerecId;
    @track showButtons = false;
   

 doneTypingInterval = 0; 
 Case_Type__c ="";
 Case_Sub_Category__c ="";  
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

 
 @track value;
 @track forward;


 cols = [
     {label:'Account Name', fieldName:'Name' , type:'text'} ,
     {label:'Phone', fieldName:'Phone' , type:'Phone'} ,
     {label:'Industry', fieldName:'Industry' , type:'text'}
           
 ]   

 
   /* get options() {
        return [
            { label: 'Non Customer', value: 'option1' },
            
        ];
    } 
    
    handleOnChange(e) {
        this.value = e.detail.value;
       
    }*/
    
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

    //Confirm Button

    getSelectedRec() {
        var selectedRecords =  this.template.querySelector("lightning-datatable").getSelectedRows();
        if(selectedRecords.length > 0)
      {
  
            let ids = '';
            selectedRecords.forEach(currentItem =>
      {
                ids = ids + ',' + currentItem.Id;
            });
            this.selectedIds = ids.replace(/^,/, '');
            this.lstSelectedRecords = selectedRecords;
           // alert(this.selectedIds);
        }  
  }

  // File Finish Method

  handleFinish(){
   // this.showToast('Success!!','Case created with the Case ID:' +this.filerecId,'success','dismissable');
   // window.setTimeout(function(){location.reload()},3000);
    
    this.navigateToRecordViewPage();
    this.handleReset();
   // this.filerecId = undefined;
   // this.showButtons = false;
    //window.location.reload();    
  }

  navigateToRecordViewPage(){
   // alert(filerecId);
    // Opens the record modal
    // to view a particular record.
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
            attributes: {
                recordId: this.filerecId,
                //objectApiName: 'namespace__ObjectName', // objectApiName is optional
                actionName: 'view'
            }
        });
}

navigateToCaseListViewPage(){
    
     this[NavigationMixin.Navigate]({
         type: 'standard__objectPage',
             attributes: {
                 objectApiName: 'Case', 
                 actionName: 'list'
             }
         });
 }

 navigateToCaseWorkListTab(){
    
    this[NavigationMixin.Navigate]({
        type: 'standard__navItemPage',
            attributes: {
                apiName: 'New_CaseFilter'
            }
        });
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
    }



    handleChangeCaseTyep(event){
        console.log('You selected an account: ' + event.detail.value); 
        this.typu = event.detail.value;
    }  
    
    handleChangeSubCaseTyep(event){
        console.log('You selected an account: ' + event.detail.value); 
        this.cat = event.detail.value; 

    }     



  
    @wire( fetchMetaListLwc, {
        typu: "$typu", cat: "$cat"})  

    wiredRecs( value ) {
       // this.Case_Type__c: "$Case_Type__c"; 
      //  this.Case_Sub_Category__c: "$Case_Sub_Category__c";
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
        //this.showQuestion = true;  
        this.showUpload = true; 
        console.log('onsubmit event recordEditForm'+ event.detail.fields);
        event.preventDefault();  
        const fields = event.detail.fields;
       // alert(fields);
        console.log("Feilds Data"+fields);
      
        if(this.records.length > 0){ 
            
        if(this.records[0].Question__c != null){  
        fields.Question__c  = this.records[0].Question__c;   
        }
      
    } 
    this.template.querySelector('lightning-record-edit-form').submit(fields);


    }

    



    handleSuccess(event) {
        this.isShowModal = true;  
        this.showButtons = true;
        this.filerecId=  event.detail.id; 
         console.log('onsuccess event recordEditForm', event.detail.id);
        console.log('onsuccess Case Number event recordEditForm', event.detail);
        
        
        /*
            const evt = new ShowToastEvent({
                title: 'Success',
                message: 'The case is created successfully.', 
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);  */
            this.filerecId=  event.detail.id;   
           // alert("Value is:"+this.value);
          // if(this.value == 'false'){
               //alert(this.value);
               // window.location.reload();  
          //  }
          // window.location.reload();    
          //  alert(event.detail.id); 
            
    }

    handleReset(event) {

       // window.location.reload();
      // this.template.querySelector('.Scrolltop').scrollTop=0;
      //  window.scrollTo(0,0);
        this.isShowModal = true; 
        this.checkboxValue = false;
        this.filerecId = '';
        this.searchKey = undefined;
        this.showTableData = false;
        this.showButtons = false;
        this.selectedIds ='';
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset(); 
            });
        }


       // console.log('onsuccess event recordEditForm', event.detail.id); 

       // this.showToast('Warning','The action was cancelled','Warning','dismissable' );
       /* const evt = new ShowToastEvent({
            title: 'Warning',
            message: 'The action was cancelled',    
            variant: 'Warning',
            mode: 'dismissable' 
        });
        this.dispatchEvent(evt); */
     }  

     handleCancel(){
        this.navigateToCaseWorkListTab();
        this.handleReset();
     }

     handleClose(){
        this.navigateToCaseWorkListTab();
        this.handleReset();
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

    // File Upload
 /*
    openfileUpload(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert('No. of files uploaded : ' + uploadedFiles.length);
    } 
   */

   
    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg','.txt','.docx','.attachment','.js','.cls','.apxt','.html','.zip'];
    }

   /* handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert('No. of files uploaded : ' + uploadedFiles.length);
    } */

    
            showToast(title,message,variant,mode){
                const event = new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
                mode: mode
                });
                this.dispatchEvent(event);
                }

    handleUploadFinished(event) {
        let strFileNames = '';
        const uploadedFiles = event.detail.files;
        for(let i = 0; i < uploadedFiles.length; i++) {
        strFileNames += uploadedFiles[i].name + ', ';
        }
        this.showToast('Success!!',strFileNames + ' Files uploaded Successfully!!!','success', 'dismissable');
        }


    checkboxValue = false;      

    handleTodoChange(event) {  
        this.checkboxValue = event.target.checked;        
        console.log("Todo: " + event.target.checked);  
    }
   
    
    get options() {
        return [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'false' },
        ];
    }

    handleOnChange(event) {
        this.value = event.detail.value;
        if(this.value=='yes'){
            this.forward = 'Hello';
        }
        else{
            this.forward = '';
        }
    }
}