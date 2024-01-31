import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_ID_FIELD from '@salesforce/schema/Case.Account_ID__c';
import CASE_TYPE_FIELD from '@salesforce/schema/Case.Case_Type__c';
import CASE_SUB_TYPE_FIELD from '@salesforce/schema/Case.Sub_Category_Type__c';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import DESCRIPTION_FIELD from '@salesforce/schema/Case.Description';
import CASE_OBJECT from '@salesforce/schema/Case';



export default class CaseCreateComponent  extends NavigationMixin(LightningElement) {
    @api caseApiName = CASE_OBJECT;
    caseId;
    
    accountIdField = ACCOUNT_ID_FIELD;
    caseTypeField = CASE_TYPE_FIELD;
    caseSubTypeField = CASE_SUB_TYPE_FIELD;
    subjectField = SUBJECT_FIELD;
    descriptionField = DESCRIPTION_FIELD;

    handleSuccess(event) {
        this.caseId = event.detail.id;
        console.log('this.accountId===> ' + this.accountId);
        
        const evt = new ShowToastEvent({
            title: 'Success!',
            message:
            'Successfully Created The Case With ID ' + this.caseId,
            variant: 'success'
        });
        this.dispatchEvent(evt);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.caseId,
                objectApiName: this.caseApiName,
                actionName: 'view'
            }
        });
    }

}