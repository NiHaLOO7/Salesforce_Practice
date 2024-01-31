public class AccountSearch {

    @AuraEnabled(Cacheable = true)
    public static list<Account> getAccountData(String textkey) {
        textkey = '%' + textkey + '%';
        list<Account> accLst = [SELECT  Id, Name, Industry, Phone, Type From Account WHERE Name LIKE :textkey WITH SECURITY_ENFORCED];

        if(accLst.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return accLst;
    }

    @AuraEnabled( cacheable=true )  
    public static List < Question__c > fetchMetaListLwc(
        String typu,
        String cat
    ){
        List < Question__c > fetchMeta = new List < Question__c >();
        String query;
        String condition = (String.isNotBlank(typu)
                            ? 'Case_Type__c LIKE \'' + '%' + typu + '%\''
                            : '');
        condition += (String.isNotBlank(cat)
                      ? (String.isNotBlank(condition) ? +' AND ' : '') +
                      ' Case_Subcategory_Type__c LIKE \'' +
                      '%' +
                      cat +
                      '%\''
                      : '');
        
        if (String.isNotBlank(cat) && String.isNotBlank(typu))
        {
           // query='SELECT Instructions__c FROM Instructions__mdt WHERE '+ condition;
           query='SELECT Id, Question__c, Case_Type__c, Case_Subcategory_Type__c FROM Question__c WHERE '+condition +'WITH SECURITY_ENFORCED';
           //query=query+'WITH SECURITY_ENFORCED';
           //WHERE Case_Type__c='Generic' and Case_Subcategory_Type__c='Generic Other'';
            system.debug('query-->' + query);
            fetchMeta = Database.query(query);
             system.debug('fetchMeta-->' + fetchMeta);
        }
        return fetchMeta;
        
    }

}