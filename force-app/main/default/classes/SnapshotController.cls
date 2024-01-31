/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-29-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class SnapshotController {
 
    @AuraEnabled(cacheable=true)
    public static List<Case> getCasesinfo(
        
        String Anm,
        String status,
        String typu,
        String errorMsg,
        string startingRecord,
        string endingRecord,
        Integer vpagesize
        
        
    ) {
        String query;
        String condition = (String.isNotBlank(status)
            ? 'Status LIKE \'' + '%' + status + '%\''
            : '');

        condition += (String.isNotBlank(Anm)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Account_ID__c LIKE \'' +
              '%' +
              Anm +
              '%\''
            : '');

        condition += (String.isNotBlank(typu)
            ? (String.isNotBlank(condition) ? +' AND ' : '') +
              ' Case_Type__c LIKE \'' +
              '%' +
              typu +
              '%\''
            : '');


        System.debug('condition ' + condition);
        if (String.isNotBlank(condition))
         {
            query =
                'SELECT CaseNumber,Account.Name,Contact.Name,Case_Type__c,Sub_Category_Type__c,Status FROM Case  WHERE ' +
                condition +
                ' ORDER BY CaseNumber';
                

        } 
        
        else
        {

            query='';
            
            
        }

        List<Case> records = Database.query(query);
        
            return records;
        
             
        }


    
}