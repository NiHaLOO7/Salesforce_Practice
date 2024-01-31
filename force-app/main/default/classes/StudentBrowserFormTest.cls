@isTest
public class StudentBrowserFormTest {
    
    @isTest
    static void getInstructorsTest(){
        Map<String, Id> sobjectIds = FwInstructorsTestUtility.createTestRecord();
        Test.startTest();
        List<User> instructors = StudentBrowserForm.getInstructors();
        System.assert(instructors.size() > 0);
        Test.stopTest();
    }
    
    @isTest
    static void getDeliveriesByInstructorIdTest(){
        Map<String, Id> sobjectIds = FwInstructorsTestUtility.createTestRecord();
        Test.startTest();
        List<Course_Delivery__c> courseDeliveries = StudentBrowserForm.getDeliveriesByInstructorId(sobjectIds.get('instructorId'));
        System.assertEquals(courseDeliveries.size(), 1);
        Test.stopTest();
    }
}