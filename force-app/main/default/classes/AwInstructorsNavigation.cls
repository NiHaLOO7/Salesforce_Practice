public with sharing class AwInstructorsNavigation {
    
    @AuraEnabled(cacheable=true)
    public static List<Certification__c> getCertifications(){
        return [ select Name, Id, Number_of_Certified_Professionals__c 
                from Certification__c 
                order by Name ];
    }
}