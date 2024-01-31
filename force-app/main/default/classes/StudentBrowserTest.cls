@isTest
public class StudentBrowserTest {
    
    @isTest
    static void getStudentTest() {
        Map<String, Id> sobjectIds = FwInstructorsTestUtility.createTestRecord();
        
        List<Contact> lstCourseAttendees;
        
        Test.startTest();
        lstCourseAttendees =  StudentBrowser.getStudents(sobjectIds.get('instructorId'), '');
        System.assertEquals(lstCourseAttendees.size(), 1);
        
        lstCourseAttendees =  StudentBrowser.getStudents(sobjectIds.get('instructorId'), sobjectIds.get('courseDeliveryId'));
        System.assertEquals(lstCourseAttendees.size(), 1);
        Test.stopTest();
        
        
    }
    
}