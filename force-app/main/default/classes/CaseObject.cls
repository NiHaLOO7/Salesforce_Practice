public with sharing class CaseObject {
    @AuraEnabled(Cacheable = true)
    public static list<Case> methodname() {
        
        List<Case> usrlist = [ SELECT Id, Agent_Groupp__c, Manager_Groupp__c FROM Case ORDER BY  CaseNumber DESC limit 1 ];
        System.debug('case--->' + usrlist );
        return usrlist;
        

    }
}