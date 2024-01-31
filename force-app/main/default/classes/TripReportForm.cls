public with sharing class TripReportForm {
    
    @AuraEnabled
    public static List<User> getInstructors() {
        return StudentBrowserForm.getInstructors();
    }
    
    @AuraEnabled
    public static List<String> getLocationTypes() {
        List <String> options = new list <String>();
        
        Schema.DescribeFieldResult fieldResult = TripReport__c.ReviewType__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        
        for( Schema.PicklistEntry f : ple)
        {
            options.add(f.getLabel());
        }       
        return options;
    }
}