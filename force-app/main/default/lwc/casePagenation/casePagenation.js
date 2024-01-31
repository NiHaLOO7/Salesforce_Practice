/* import { LightningElement, track, wire } from 'lwc';
import getCases from "@salesforce/apex/pageNationController.getCasesList";

const columns = [
    { label: 'CaseNumber', fieldName: 'CaseNumber' },
    { label: 'Status', fieldName: 'Status' },
   ];

export default class CasePagenation extends LightningElement {

    @track columns;
    @track data;
    @track items;
    @track startingRecord = 1;
    @track page=1;
    @track endingRecord = 1;
    @track totalRecordCount;
    @track totalPage=1;
    @track pageSize=10;

    @track error;
    @track accList ;
    @wire(getCases)
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            this.data = data;
        } else if (error) {
            this.error = error;
        }
    }
 
  /*
    @wire(getCases) 
    wiredSObjects(result) {
        console.log("wire getting called");
       // this.wiredCases = result;
        
        if (result.data) {
            
            //Sirish
            this.items = result.data;
            this.totalRecordCount = result.data.length;
           // this.totalPage = Math.ceil(this.totalRecordCount/this.V_pageSize);
           // this.data = this.items.slice(0,this.V_pageSize);
           // this.endingRecord = this.V_pageSize;

            this.totalPage = Math.ceil(this.totalRecordCount/this.pageSize);
            this.data = this.items.slice(0,this.pageSize);
            this.endingRecord = this.pageSize;
        }
    }
  */
/*
   
    
    previousHandler(event){

        console.log("Previous button is working");
        if(this.page > 1){
            this.page = this.page - 1;
            this.displayRecordPerPage(this.page);
        } 
    }

    nextHandler(event){
        
        console.log("Next button is working");
        if(this.page < this.totalPage && this.page != this.totalPage){
            this.page = this.page + 1;
            this.displayRecordPerPage(this.page);
        } 
    }

    displayRecordPerPage(page){
        //this.startingRecord = (page-1)*this.V_pageSize;
        //this.endingRecord = page * this.V_pageSize;

        this.startingRecord = (page-1)*this.pageSize;
        this.endingRecord = page * this.pageSize;

        this.endingRecord = (this.endingRecord > this.totalRecordCount)?this.totalRecordCount:this.endingRecord;
        this.data = this.items.slice(this.startingRecord,this.endingRecord);
        this.startingRecord = this.startingRecord + 1; 
    } 
} 

*/

/*

import { LightningElement ,api, wire, track} from 'lwc';
import getCases from '@salesforce/apex/pageNationController.getCasesList';
export default class LightningDatatableLWCExample extends LightningElement {
    
    @track columns = [{
            label: 'Case Number',
            fieldName: 'CaseNumber',
            type: 'text',
            sortable: true
        },
        {
            label: 'Account Name',
            fieldName: 'Cases',
            type: 'text',
            sortable: true
        },
        {
            label: 'Contact Name',
            fieldName: 'Contact.Name',
            type: 'text',
            sortable: true
        },
        {
            label: 'Case Type',
            fieldName: 'Case_Type__c',
            type: 'picklist',
            sortable: true
        },
        {
            label: 'Sub Category',
            fieldName: 'Sub_Category_Type__c',
            type: 'picklist',
            sortable: true
        },
        {
            label: 'Status',
            fieldName: 'Status',
            type: 'text',
            sortable: true
        }
    ];

/*
    @track columns;
    @track data;
    @track items;
    @track startingRecord = 1;
    @track page=1;
    @track endingRecord = 1;
    @track totalRecordCount;
    @track totalPage=1;
    @track pageSize=10; 

    @track items;
    @track error;
    @track caseList ;
    @wire(getCases)
    wiredCases(result) {
        if (result.data) {

           // this.items = data;
            this.caseList = result.data;
           // this.items = result.data;
           /* this.totalRecordCount = result.data.length;
           // this.totalPage = Math.ceil(this.totalRecordCount/this.V_pageSize);
           // this.data = this.items.slice(0,this.V_pageSize);
           // this.endingRecord = this.V_pageSize;

            this.totalPage = Math.ceil(this.totalRecordCount/this.pageSize);
            this.data = this.items.slice(0,this.pageSize);
            this.endingRecord = this.pageSize; 

        } 
    }



    previousHandler(event){

        console.log("Previous button is working");
        if(this.page > 1){
            this.page = this.page - 1;
            this.displayRecordPerPage(this.page);
        } 
    }

    nextHandler(event){
        
        console.log("Next button is working");
        if(this.page < this.totalPage && this.page != this.totalPage){
            this.page = this.page + 1;
            this.displayRecordPerPage(this.page);
        } 
    }

    displayRecordPerPage(page){
        //this.startingRecord = (page-1)*this.V_pageSize;
        //this.endingRecord = page * this.V_pageSize;

        this.startingRecord = (page-1)*this.pageSize;
        this.endingRecord = page * this.pageSize;

        this.endingRecord = (this.endingRecord > this.totalRecordCount)?this.totalRecordCount:this.endingRecord;
        this.data = this.items.slice(this.startingRecord,this.endingRecord);
        this.startingRecord = this.startingRecord + 1; 
    } 
} */

/*
import { LightningElement } from 'lwc';
import getAccounts from'@salesforce/apex/AccountDataController.getAccounts';

export default class AccountData extends LightningElement {
    accounts;
    allaccounts;
    totalAccounts = 0;
    pageSize = 5;
    columns =[
                { 'label' : 'Name', 'fieldName' : 'name'},
                { 'label' : 'Account Number', 'fieldName' : 'accountnumber'},
                { 'label' : 'Phone', 'fieldName' : 'phone'}
            ];

    connectedCallback(){
        this.init();
    }


    init(){
        getAccounts().then(res=>{
            let accounts = res.lstAcc;
            let acc_a = [];
            if(accounts){
                this.totalAccounts = accounts.length;
                accounts.forEach(acc => {
                    let a ={};
                    a.Id = acc.Id;
                    a.name = acc.Name;
                    a.accountnumber = acc.AccountNumber;
                    a.phone = acc.Phone;
                    acc_a.push(a);
                });
                this.allaccounts = acc_a;
                console.log("Accounts"+this.accounts);
                this.accounts = this.allaccounts.slice(0,this.pageSize);
            }
        });
    }

    handlePagination(event){
        const start = (event.detail-1)*this.pageSize;
        const end = this.pageSize*event.detail;
        this.accounts = this.allaccounts.slice(start, end);
    }
} */

import { LightningElement,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class FileUploadOnRecordInsert extends LightningElement {
@track recId;
handleUpload(event){
this.showButtons = true;
this.recId = event.detail.id;

}
showToast(title,variant,message){
const event = new ShowToastEvent({
title: title,
message: message,
variant: variant
});
this.dispatchEvent(event);
}
get acceptedFormats() {
return ['.pdf', '.png','.jpg','.jpeg','.txt','.docx','.attachment','.js','.cls','.apxt','.html','.zip'];
}
handleUploadFinished(event) {
let strFileNames = '';
const uploadedFiles = event.detail.files;
for(let i = 0; i < uploadedFiles.length; i++) {
strFileNames += uploadedFiles[i].name + ', ';
}
this.showToast('Success!!','success',strFileNames + ' Files uploaded Successfully!!!');
}
handleFinish(){
this.handleReset();
this.recId = undefined;
this.showButtons = false;
}
handleReset() {
const inputFields = this.template.querySelectorAll('lightning-input-field');
if (inputFields) {
inputFields.forEach(field => {
field.reset();
});
}
}
}