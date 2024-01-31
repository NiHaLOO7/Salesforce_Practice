/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-19-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class lwcAppExampleApex {
    @AuraEnabled(cacheable=true)
    public static List<Case> retrieveCaseData(string keySearch){
    List<Case> mycaseList = [Select Id, OwnerId, CaseNumber, Priority, Account_ID__c,Case_Type__c From Case Where Case_Type__c=:keySearch];
    return mycaseList;
    }
}