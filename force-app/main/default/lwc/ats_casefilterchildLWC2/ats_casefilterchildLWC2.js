import { LightningElement, wire, track, api } from 'lwc';
import { deleteRecord, updateRecord  } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from "lightning/navigation";
import ASSIGNED_USER from '@salesforce/schema/Case.Case_Assign_User_Name__c';
import ID_FIELD from '@salesforce/schema/Case.Id';
import getCase from '@salesforce/apex/ats_FilteredTableController.getCase'; 
import getContentDocs from '@salesforce/apex/ats_FilteredTableController.getContentDocs'; 
import getCaseComments from '@salesforce/apex/ats_FilteredTableController.getComments'; 
import getCaseEvents from '@salesforce/apex/ats_FilteredTableController.getEvents'; 
import getCaseDocuments from '@salesforce/apex/ats_FilteredTableController.getDocuments'; 

const colsInput = [
    { label: 'Special Instructions (If Any)', fieldName: 'Question__c',  wrapText: true },
    { label: 'Agent Notes', fieldName: 'Answer__c' },
 ];

 const colsComments = [
    { label: 'Date', fieldName: 'insertDate' },
    { label: 'Updated by Agent', fieldName: 'modifiedBy' },
    { label: 'Updated by User ID', fieldName: 'insertBy' },
    { label: 'Comment', fieldName: 'commentsText' },
 ];

 const colsDocuments = [
    { label: 'Doc Name', fieldName: 'title' },
    { label: 'Upload Date', fieldName: 'insertDate' },
    { label: 'Uploaded by', fieldName: 'insertBy' },
    ];

const colsEvents = [
   // { label: 'Id', fieldName: 'Id' },
    { label: 'Date and Time', fieldName: 'modifiedDate' },
    { label: 'Performed by', fieldName: 'modifiedBy' },
    { label: 'Action', fieldName: 'actionType' },
    { label: 'Details', fieldName: 'eventsText' },
       ];
export default class ats_ChildCaseDetails extends NavigationMixin(LightningElement) {

    activeSections = ['A', 'B', 'C', 'D', 'E','F'];  
 //recordId ='500Iw000001rXmAIAU';

 recordId = '500Iw000001rsxTIAQ';
 
// recordId ='500Iw000001oGI3IAM';
    
  //  @api recordId;
    columnsInput = colsInput;
    columnsComments = colsComments;
    columnsDocuments = colsDocuments;
    columnsEvents = colsEvents;
    @track caseHeading;
    @track caseHeading2;
    @track msg = true;
    @track lengthCheck;
    casesData;
    @track contentData;
    @track title;
    @track casestest;
    statusValue = 'Cancelled';
    @track selectedIds;
    @track cancelCase=false;
    @track hideCancelButton = false;
    @track commentsVal = null;
    @track submitDisabled = true;
    @track caseDeatils;
    @track caseEvents;
    isShowModal = false;
    @track actionsDisabled = false;
    result;
   
    @track inProgressCheck = false;
    @wire(getCase,{crecordId: "$recordId"})
    cases({data}){
        if(data){
            this.casesData = data;
            this.caseHeading = this.casesData[0].Case_Display_Name__c;
            this.caseHeading2 = this.casesData[0].Sub_Category_Type__c;
            this.title = this.caseHeading+' - '+this.caseHeading2; 
            
            if(this.casesData[0].Status == 'In Progress'){
                this.inProgressCheck = true;
            }
            /*
            console.log(data);
            this.casestest = JSON.stringify(this.casesData);
            this.caseHeading = JSON.stringify(this.casesData);
            this.caseHeading2= JSON.stringify(this.casesData);
            this.caseHeading2 = this.caseHeading2.substr(-80);
            this.caseHeading = this.caseHeading.substr(-100);
            this.caseHeading2 = this.caseHeading2.slice(this.caseHeading2.indexOf('Case_Display_Name__c":"') + 23);
            this.caseHeading2=this.caseHeading2.substring(0,this.caseHeading2.indexOf('"'));
            this.title = this.caseHeading2;            
            if (this.caseHeading.indexOf("Sub_Category_Type__c") != -1)
                {     
                    this.caseHeading = this.caseHeading.slice(this.caseHeading.indexOf('Sub_Category_Type__c":"') + 23);
                    this.caseHeading = this.caseHeading.substring(0,this.caseHeading.indexOf('"'));
                    this.title = this.caseHeading2+' - '+this.caseHeading;                 
                    
                } */

        }
    }
 
    
    @wire(getContentDocs, {arecordId: "$recordId"}) 
    docs({data}){
        if(data){
            this.contentData = data;
            this.msg = data.toString();
            this.lengthCheck = this.msg.length;
            if(this.lengthCheck>0){
                this.msg=false;
            }else{
                this.msg=true;
            }
            console.log(data);
          
        } 
    }

   

    @wire(getCaseComments, {gccrecordId: "$recordId"}) 
    wiredCasedetails({data,error}){
        if(data){
            this.caseDeatils = data;   
            alert('Case Details:'+ JSON.stringify(caseDeatils));              
        } else if (error) {
            console.error(error);
        }
    }

   

    @wire(getCaseEvents, {gerecordId: "$recordId"}) 
    wiredCaseEvents({data,error}){
        if(data){
            this.caseEvents = data;   
            alert('Case Events:'+ JSON.stringify(caseEvents));              
        } else if (error) {
            console.error(error);
        }
    }

    

    @wire(getCaseDocuments, {gdrecordId: "$recordId"}) 
    wiredCaseDocs({data,error}){
        if(data){
            this.caseDocs = data;   
            alert('Case Docs:'+ JSON.stringify(caseDocs));              
        } else if (error) {
            console.error(error);
        }
    }
  
    handleDone(){
        this.navigateToCaseWorkListTab();
        this.callParent();
     }

     callParent(event){
        let ev = new CustomEvent('childmethod');
            this.dispatchEvent(ev);                    
    }

     navigateToCaseWorkListTab(){
    
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
                attributes: {
                    apiName: 'New_CaseFilter'
                }
            });
    }

    handleUploadFinished(event) {
        let strFileNames = '';
        const uploadedFiles = event.detail.files;
        for(let i = 0; i < uploadedFiles.length; i++) {
        strFileNames += uploadedFiles[i].name + ', ';
        }
        window.location.reload();
        }

        
       
        getSelectedRec() {
            var selectedRecords =  this.template.querySelector('[data-id="overview"]').getSelectedRows();
            if(selectedRecords.length > 0)
          {
           
                let ids = '';
                selectedRecords.forEach(currentItem =>
          {
                    ids = ids + ',' + currentItem.Id;
                });
                this.selectedIds = ids.replace(/^,/, '');
                this.lstSelectedRecords = selectedRecords;
             //   alert(this.selectedIds);
                this.deleteRecords(this.selectedIds);
            }  
      }

      deleteRecords(selectedIds){
      deleteRecord(this.selectedIds)
      .then(() => {
          console.log("Deleted sucessfully");
            
      }).catch(error => {
            console.error(error);
      });

      window.location.reload();
}

refreshData() {
    return refreshApex(this.contentData);
}


handleCancelCase(){
this.cancelCase = true;
this.hideCancelButton = false;
this.inProgressCheck = false;
}

showModalBox() {  
    this.isShowModal = true;
}
handleSubmit() {
    this.template.querySelector('lightning-record-edit-form').submit()

}

handleSelfAssign(event){
  //  alert(this.casesData[0].Owner.Name);
    const fields = {};

    fields[ID_FIELD.fieldApiName] = this.casesData[0].Id;
    fields[ASSIGNED_USER.fieldApiName] = this.casesData[0].Owner.Name;
    const recordInput = {
      fields: fields
    };

        //6. Invoke the method updateRecord()
    updateRecord(recordInput).then((record) => {
      console.log(record);
    });
  }


 
submitCaseActions(){
   this.result = this.template.querySelector('[data-id="commInputId"]').reportValidity();
   if(this.result){
      
        this.template.querySelector('[data-id="caseActionsID"]').submit();
    }
}


handleSummaryButton(){
    this.actionsDisabled = false;
    this.hideCancelButton = false;
    this.cancelCase = false;
}

handleRelatedButton(){
    this.actionsDisabled = true;
    this.hideCancelButton = true;
}

handleSuccess(event) {
    this.template.querySelector('[data-id="caseDetailsActionsID"]').submit();
    this.navigateToCaseWorkListTab();   
}


handleModalYesButton(){
   
    this.isShowModal = false;
    this.cancelCase = false;
    this.hideCancelButton = false;
  //  this.template.querySelector('lightning-record-edit-form').submit(fields);
   // this.template.querySelector('[data-id="overview1"]').submit(fields);
   this.handleSubmit();
}
   
    

handleModalNoButton(){
    this.isShowModal = false;
    this.cancelCase = false;
    this.submitDisabled = true;
    this.commentsVal ='';
}




handleChangeInput(event){
    this.commentsVal = event.detail.value;
    this.commentsVal = this.commentsVal.toString();
    if(this.commentsVal.length>0){
    this.submitDisabled = false;
    }else{
        this.submitDisabled = true;
    }
}


}