public with sharing class lwcCustomMetaDataCtrl
{
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
           query='SELECT Id, Question__c, Case_Type__c, Case_Subcategory_Type__c FROM Question__c WHERE '+condition;
           //WHERE Case_Type__c='Generic' and Case_Subcategory_Type__c='Generic Other'';
            system.debug('query-->' + query);
            fetchMeta = Database.query(query);
             system.debug('fetchMeta-->' + fetchMeta);
        }
        return fetchMeta;
        
    }
}