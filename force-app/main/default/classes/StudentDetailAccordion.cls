public with sharing class StudentDetailAccordion {
    
    @AuraEnabled
    public static List<Certification_Held__c> getCertificationsForStudent(Id contactId){
        return [SELECT 
                Id, 
                Certification__r.Name, 
                Date_Achieved__c 
                FROM Certification_Held__c
                WHERE Certified_Professional__c = :contactId];
            }
}