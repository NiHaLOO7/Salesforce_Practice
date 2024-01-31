public with sharing class StudentDetail {
    
    @auraEnabled
    public static List<Course_Attendee__c> getCourseAttendees(String studentId){
        List<Course_Attendee__c> courseAttendees = [select Id, InstructorNotes__c, Student__c, Student__r.FirstName, 
                                                    Course_Delivery__r.Start_Date__c, Course_Delivery__r.Course__r.Name, Status__c 
                                                    from Course_Attendee__c where Student__c = :studentId];
        return courseAttendees;
    }
    
}