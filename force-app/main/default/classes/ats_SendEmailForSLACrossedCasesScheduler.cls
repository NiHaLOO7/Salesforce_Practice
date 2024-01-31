global class ats_SendEmailForSLACrossedCasesScheduler implements Schedulable {
    
    global void execute(SchedulableContext sc) {
        ats_UpdateCaseStatus b = new ats_UpdateCaseStatus(); 
        database.executebatch(b);
    }
}