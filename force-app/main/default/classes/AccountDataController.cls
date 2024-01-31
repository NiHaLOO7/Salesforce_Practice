public with sharing class AccountDataController {
    @AuraEnabled(cacheable=true)

    public static List<Account> getAccounts(){
        return [SELECT Id, Name, AccountNumber, Phone FROM Account];
    }
}