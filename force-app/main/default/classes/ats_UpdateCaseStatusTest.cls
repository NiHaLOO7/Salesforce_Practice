@isTest(SeeAllData=false)
public class ats_UpdateCaseStatusTest {
    
    @isTest static void createCaseTest(){
        
        List<Case> createCaseList = new List<Case>();
        integer caseCount = 0;
        
        for(caseCount = 0 ; caseCount < 5; caseCount ++)
        {
            Case createCase  = new Case();
            createCase.Status = 'Pending';
            createCaseList.add(createCase);
        }
        
        
        
        Test.startTest();
        
        if(createCaseList.size() > 0){
            INSERT createCaseList;
        }
        
        system.assertEquals(5, createCaseList.size() , 'Case Record is created');
        
        ats_UpdateCaseStatus instUpdateCase = new ats_UpdateCaseStatus();
        Database.executeBatch(instUpdateCase);
        
        Test.stopTest();
    }
    
}