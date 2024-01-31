import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getCase from '@salesforce/apex/ats_AccountSearch.getCase'; 
import getContentDocs from '@salesforce/apex/ats_AccountSearch.getContentDocs'; 

const cols = [
    { label: 'Special Instructions (If Any)', fieldName: 'Question__c',  wrapText: true },
    { label: 'Agent Notes', fieldName: 'Answer__c' },
 ];

 const cols1 = [
    { label: 'Date', fieldName: 'CreatedDate' },
    { label: 'Updated by Agent', fieldName: 'CreatedById' },
    { label: 'Updated by User ID', fieldName: 'CreatedById' },
    { label: 'Comment', fieldName: 'Comments__c' },
 ];

 const cols2 = [
    { label: 'Doc Name', fieldName: 'Title' },
    { label: 'Upload Date', fieldName: 'CreatedDate' },
    { label: 'Uploaded by', fieldName: 'CreatedById' },
    ];
export default class ats_ChildCaseDetails extends NavigationMixin(LightningElement) {

    activeSections = ['A', 'B', 'C', 'D'];  
// recordId ='500Iw000001rXmAIAU';

// recordId ='500Iw000001oGI3IAM';
    
    @api recordId;
    columns = cols;
    columns1 = cols1;
    columns2 = cols2;
    @track caseHeading;
    @track caseHeading2;
    @track msg = true;
    @track lengthCheck;
    casesData;
    contentData;
    @track title;
    @track casestest;
    @wire(getCase,{crecordId: "$recordId"})
    cases({data}){
        if(data){
            this.casesData = data;
            console.log(data);
            this.casestest = JSON.stringify(this.casesData);
            this.caseHeading = JSON.stringify(this.casesData);
            this.caseHeading2= JSON.stringify(this.casesData);
            this.caseHeading2 = this.caseHeading2.substr(-80);
            this.caseHeading = this.caseHeading.substr(-80);
            this.caseHeading2 = this.caseHeading2.slice(this.caseHeading2.indexOf('Case_Display_Name__c":"') + 23);
            this.caseHeading2=this.caseHeading2.substring(0,this.caseHeading2.indexOf('"'));
            this.title = this.caseHeading2;            
            if (this.caseHeading.indexOf("Reason") != -1)
                {     
                    this.caseHeading = this.caseHeading.slice(this.caseHeading.indexOf('Reason":"') + 9);
                    this.caseHeading = this.caseHeading.substring(0,this.caseHeading.indexOf('"'));
                    this.title = this.caseHeading2+' - '+this.caseHeading;                 
                    
                }

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

}