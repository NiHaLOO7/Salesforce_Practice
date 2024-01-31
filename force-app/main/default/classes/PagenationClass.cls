/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-02-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class PagenationClass {

    @AuraEnabled(cacheable=true)
    public static List<Case> getCasesperpage(
        String gcaseNumber,
        String gaccountName,
        String gcontactName,
        String gcat,
        String gstatus,
        String gtypu,
        String gerrorMsg
        
    ) {
        String gquery;
        String gcondition = (String.isNotBlank(gcaseNumber)
            ? 'CaseNumber LIKE \'' + '%' + gcaseNumber + '%\''
            : '');

        gcondition += (String.isNotBlank(gaccountName)
            ? (String.isNotBlank(gcondition) ? +' AND ' : '') +
              ' Account.Name LIKE \'' +
              '%' +
              gaccountName +
              '%\''
            : '');

        gcondition += (String.isNotBlank(gcontactName)
            ? (String.isNotBlank(gcondition) ? +' AND ' : '') +
              ' Contact.Name LIKE \'' +
              '%' +
              gcontactName +
              '%\''
            : '');

        gcondition += (String.isNotBlank(gcat)
            ? (String.isNotBlank(gcondition) ? +' AND ' : '') +
              ' Sub_Category_Type__c LIKE \'' +
              '%' +
              gcat +
              '%\''
            : '');


        gcondition += (String.isNotBlank(gstatus)
            ? (String.isNotBlank(gcondition) ? +' AND ' : '') +
              ' Status LIKE \'' +
              '%' +
              gstatus +
              '%\''
            : '');

        gcondition += (String.isNotBlank(gtypu)
            ? (String.isNotBlank(gcondition) ? +' AND ' : '') +
              ' Case_Type__c LIKE \'' +
              '%' +
              gtypu +
              '%\''
            : '');


       
        if (String.isNotBlank(gcondition))
         {
           gquery =
                'SELECT CaseNumber,Account.Name,Contact.Name,Case_Type__c,Sub_Category_Type__c,Status FROM Case  WHERE ' +
                gcondition +
                ' ORDER BY CaseNumber';
                

        } 
        
        else
        {
            //query = 'SELECT CaseNumber,CaseNumber,Account.Name,Contact.Name,Case_Type__c,Sub_Category_Type__c,Status FROM Case ORDER BY CaseNumber limit :vpagesize OFFSET 1';
            gquery='';
            
            
        }

        List<Case> recordsperpage = Database.query(gquery);
        
            return recordsperpage;
        
             
        }


    

}