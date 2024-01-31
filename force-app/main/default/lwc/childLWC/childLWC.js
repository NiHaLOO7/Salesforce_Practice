import { LightningElement, wire, api, track } from "lwc";
import getCases from "@salesforce/apex/FilteredTableController.getCases";
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";




export default class FilteredTable extends NavigationMixin(LightningElement) 
{
    
    
    @track a='';
    @track v_pagesize='5';
    @track errorMsg = '';
    @track data;
    @track readOnlyBool=true;
    @track readOnlyBool2=true;
    searchable = [];
    wiredCases;
    doneTypingInterval = 0;
    statusPickListValues;
    categoryPickListValues;
    caseTypePickListValues;
    searchAllValue;
    @api caseNumber = "";
    @api accountName = "";
    @api contactName = "";
    @api cat = null;
    @api status = null;
    @api typu=null;
    @api rst=false;


    

    get comboBoxOptions() {
        var pageLimitList = [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '20', value: '20' },
            { label: '30', value: '30' },
            { label: '50', value: '50' },
            { label: '100', value: '100' }

        ];
        return pageLimitList;
    }
 

    
    @wire(getCases, {
        caseNumber: "$caseNumber",
        accountName: "$accountName",
        contactName: "$contactName",
        cat: "$cat",
        status: "$status",
        typu: "$typu",
        v_pagesize:"$v_pagesize",
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



    
    


    



    



    handleLimitChange(event){
        this.pageNumber=1;
        this.v_pagesize=event.target.value;
        

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