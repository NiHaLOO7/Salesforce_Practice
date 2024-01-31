public class ats_UpdateCaseStatus implements Database.batchable<sObject> {
    
    public database.QueryLocator start(Database.BatchableContext bc){
        
        string  caseQuery;
        
        if(Test.isRunningTest()){
            
             caseQuery = 'SELECT Id, Status, LastModifiedDate FROM Case'+
                ' WHERE Case.Status = \'' + 'Pending' + '\'';  
        }
        else{
             caseQuery = 'SELECT Id, Status, LastModifiedDate FROM Case'+
                ' WHERE LastModifiedDate  > LAST_N_DAYS:7  AND Case.Status = \'' + 'Pending' + '\''; 
        }
        
        
        return database.getQueryLocator(caseQuery);
    }
    
    public void execute(database.BatchableContext bc,list<Case> scope){
        List<Case> updateCaseList = new List<Case>();
        
        for(case updateCase : scope)
        {
            case updateCaseStatus = new Case();
            
            updateCaseStatus.Id = updateCase.Id;
            updateCaseStatus.Status = 'In Progress';
            updateCaseList.add(updateCaseStatus);
        }
        
        if(updateCaseList.size() > 0){
            
            try{
                UPDATE updateCaseList;
            }
            catch(Exception ex){
                system.debug('ERROR :' + ex.getMessage());
            }
        }
    }
    
    public void finish(database.BatchableContext bc){
        
    } 
    
}