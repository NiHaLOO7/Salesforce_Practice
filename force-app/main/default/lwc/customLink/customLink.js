import { LightningElement, track } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';
const COLUMNS = [
    {
        label: 'Name', fieldName: 'Accounturl', type: 'url',
        typeAttributes: {
            label: {
                fieldName: 'Name'
            }
        }
    },
    {label: 'Type', fieldName: 'Type', type: 'text'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone', 
        cellAttributes: { 
            iconName: 'utility:phone_portrait' 
        }
    }
];

export default class CustomLink extends LightningElement {
    @track lstAccounts;
    lstColumns = COLUMNS;

    connectedCallback(){
        fetchAccounts().then(response => {
            this.lstAccounts = response;
            if(this.lstAccounts){
                this.lstAccounts.forEach(item => item['Accounturl'] = '/lightning/r/Account/' +item['Id'] +'/view');
                
            }
        }).catch(error => {
            console.log('Error: ' +error);
        });
    }
}