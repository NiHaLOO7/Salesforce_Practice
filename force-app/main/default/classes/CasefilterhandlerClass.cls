/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-02-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class CasefilterhandlerClass 
{
        @AuraEnabled(cacheable=true)
        public static List<Case> getFilteredCases(
            String caseNumber,
            String accountName,
            String contactName,
            String cat,
            String status,
            String typu,
            Integer v_pagesize,
            String errorMsg
            
        ) {
            String query;
            String condition = (String.isNotBlank(caseNumber)
                ? 'CaseNumber LIKE \'' + '%' + caseNumber + '%\''
                : '');
    
            condition += (String.isNotBlank(accountName)
                ? (String.isNotBlank(condition) ? +' AND ' : '') +
                  ' Account.Name LIKE \'' +
                  '%' +
                  accountName +
                  '%\''
                : '');
    
            condition += (String.isNotBlank(contactName)
                ? (String.isNotBlank(condition) ? +' AND ' : '') +
                  ' Contact.Name LIKE \'' +
                  '%' +
                  contactName +
                  '%\''
                : '');
    
            condition += (String.isNotBlank(cat)
                ? (String.isNotBlank(condition) ? +' AND ' : '') +
                  ' Sub_Category_Type__c LIKE \'' +
                  '%' +
                  cat +
                  '%\''
                : '');
    
    
            condition += (String.isNotBlank(status)
                ? (String.isNotBlank(condition) ? +' AND ' : '') +
                  ' Status LIKE \'' +
                  '%' +
                  status +
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
                    ' ORDER BY CaseNumber LIMIT :v_pagesize';
                    
    
            } 
            
            else
            {
                
                query='';
                
                
            }
    
            List<Case> records = Database.query(query);
            
                return records;
            
                 
            }
    
    
        
    }