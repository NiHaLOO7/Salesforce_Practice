import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getCase from '@salesforce/apex/ats_AccountSearch.getCase'; 

const columns = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];

const cols = [
    { label: 'Special Instructions (If Any)', fieldName: 'Question__c',  wrapText: true },
    { label: 'Agent Notes', fieldName: 'Comments__c' },
 ];

 const cols1 = [
    { label: 'Date', fieldName: 'CreatedDate' },
    { label: 'Updated by Agent', fieldName: 'CreatedById' },
    { label: 'Updated by User ID', fieldName: 'CreatedById' },
    { label: 'Comment', fieldName: 'Comments__c' },
 ];
export default class ChildCaseDetails extends NavigationMixin(LightningElement) {

    activeSections = ['A', 'B', 'C', 'D'];  
    recordId="500Iw000001rCBUIA2";
   
    columns = cols;
    columns1 = cols1;

    @wire(getCase)
    cases;


    handleDone(){
        this.navigateToCaseWorkListTab();
     }

     navigateToCaseWorkListTab(){
    
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
                attributes: {
                    apiName: 'New_CaseFilter'
                }
            });
    }
}