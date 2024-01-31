public with sharing class TripReportBrowser {
    
    @AuraEnabled
    public static List<TripReport__c> getAll() {
        return [
            select Id,
            Name, 
            Date__c, 
            Rating__c, 
            Review__c, 
            ReviewType__c,
            Instructor__r.Name
            from TripReport__c
            order by Date__c desc
        ];
    }
    
}