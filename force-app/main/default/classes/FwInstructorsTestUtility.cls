@isTest
public class FwInstructorsTestUtility {
    
    
    public static Map<String, Id> createTestRecord(){
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        
        User instructor = new User(Alias = 'standt', Email='testStandardUser123@test123.com', 
                                   EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US', 
                                   LocaleSidKey='en_US', ProfileId = p.Id, 
                                   TimeZoneSidKey='America/Los_Angeles', UserName='testStandardUser123@test123.com', Is_Instructor__c = true);
        insert instructor;
        
        Id testUserId = [select Id from User where Email = 'testStandardUser123@test123.com'].Id;
        
        Course__c course = new Course__c(Name='Test Course', Course_Description__c='Test course for apex testing', Status__c='Active');
        insert course;
        
        Course_Delivery__c courseDelivery = new Course_Delivery__c(Course__c= course.Id, Instructor__c= instructor.Id, Status__c = 'Delivered');
        insert courseDelivery;
        
        Contact con = new Contact(FirstName='Student', LastName='TestContact');
        insert con;
        
        Course_Attendee__c courseAttendee = new Course_Attendee__c(Course_Delivery__c=courseDelivery.Id, Student__c = con.Id, InstructorNotes__c='Instruction notes for testing purpose', Status__c='Completed' );
        insert courseAttendee;
        
        Map<String, Id> sobjectIds = new Map<String,String>();
        sobjectIds.put('courseId', course.Id);
        sobjectIds.put('instructorId', instructor.Id);
        sobjectIds.put('courseDeliveryId', courseDelivery.Id);
        sobjectIds.put('ContactId', con.Id);
        sobjectIds.put('courseAttendeeId', courseAttendee.Id);
        
        return sobjectIds;
    }
}