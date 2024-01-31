@isTest(SeeAllData=false)
public class ats_UpdateCaseStatusScheduleTest {
    
    static testMethod void testschedule(){  
        Test.StartTest();
        ats_UpdateCaseStatusSchedule testsche = new ats_UpdateCaseStatusSchedule();
        String sch = '0 0 23 * * ?';
        system.schedule('Test status Check', sch, testsche);
        Test.stopTest();
    }

}