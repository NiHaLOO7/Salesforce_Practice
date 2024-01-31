public with sharing class caseSnapshopchild {

        @AuraEnabled(cacheable=true)
        public static List<Case> getchildCases(
            String cat,
            String status,
            String typu,
            String slavalue

            
        ) {
            String query;
            String condition = (String.isNotBlank(cat)
                ? 'Sub_Category_Type__c LIKE \'' + '%' + cat + '%\''
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
           
            if(slavalue=='YES')
            {
				slavalue='Y';
            }
            else if(slavalue=='NO')
            {
                slavalue='N';
            }
             else 
            {
                slavalue='';
            }
            
            condition += (String.isNotBlank(slavalue)
                ? (String.isNotBlank(condition) ? +' AND ' : '') +
                  ' Is_SLA_Crossed__c LIKE \'' +
                  '%' +
                  slavalue +
                  '%\''
                : '');
            
			
            
			
            System.debug(slavalue);
			
            if (String.isNotBlank(condition))
             {
                query =
                    'SELECT Case_Type__c,Sub_Category_Type__c,TSYS_External_Account_ID__c,Status,Case_Assign_User_Name__c,CreatedDate,ClosedDate,Case_Age_Days_del__c,Case_Resolution_Target_DT__c,Is_SLA_Crossed__c,Remaining_Days_Until_SLA__c FROM Case  WHERE ' +
                    condition +' ORDER BY CaseNumber';
                    
    
            } 
            
            else
            {
                
                query='';
                
                
            }
    		System.debug(query);
            List<Case> records = Database.query(query);
            
                return records;
            
                 
            }
    
    
        
    }