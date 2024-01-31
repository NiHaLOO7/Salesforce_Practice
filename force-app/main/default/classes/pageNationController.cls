/* public with sharing class pageNationController {
    @AuraEnabled(cacheable=true)

    public static List<Case> getCasesList(){
        return [SELECT CaseNumber,Status FROM Case ORDER BY CaseNumber];
    }
}
*/

public with sharing class pageNationController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCasesList() {
        return [SELECT CaseNumber,Account.Name,Contact.Name,Case_Type__c,Sub_Category_Type__c,Status FROM Case ORDER BY CaseNumber];
    }
}