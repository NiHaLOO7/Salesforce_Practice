/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 08-09-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public class AccountController {
     
    @AuraEnabled
    public static list<Account> fetchAccounts(){
        return [SELECT Id, Name, Type, Phone FROM Account LIMIT 100];
    }
}