@isTest
public class StudentDetailTest {
    @isTest
    static void testStudentDetail(){
        Contact myContact = new Contact(FirstName='Steve', LastName='Drucker');
        List<Contact> sList = new List<Contact>();
        sList.add(myContact);
        insert sList; 
        
        List<Contact> myContacts = [select Id from Contact limit 1];
        List<Course_Attendee__c> courseAttendees = StudentDetail.getCourseAttendees(myContacts[0].Id);
        
        System.assertEquals(courseAttendees.size(), 0);
    }
}