public with sharing class StudentBrowserForm {
    
    @AuraEnabled(cacheable=true)
    public static List<User> getInstructors (){
        return [
            select Id, Name 
            from User 
            where Is_Instructor__c = true
            order by Name
        ];
    }
    
    @AuraEnabled
    public static List<Course_Delivery__c> getDeliveriesByInstructorId(String instructorId){
        
        return [select id, Start_Date__c, Location__c, Attendee_Count__c 
                from Course_Delivery__c 
                where Instructor__c = :instructorId 
                order by Start_Date__c desc];
        
    } 
    
}