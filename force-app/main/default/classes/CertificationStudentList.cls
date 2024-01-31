public with sharing class CertificationStudentList {
    
    @AuraEnabled
    public static List<Certification_Held__c> getCertifiedStudents(Id certificationId){
        return [SELECT 
                Id, 
                Certified_Professional__r.Name, 
                Certification__r.Name, 
                Certified_Professional__r.Id, 
                Certified_Professional__r.Email, 
                Certified_Professional__r.MobilePhone, 
                Date_Achieved__c 
                FROM Certification_Held__c
                WHERE Certification__r.Id = :certificationId
                ORDER BY Certified_Professional__r.Name ];
    }
    
    @AuraEnabled
    public static Boolean deleteStudentCertification(List<String> certificationIds){
        try{
            delete [select id from Certification_Held__c where Id = :certificationIds];
            return true;
        } catch(Exception e){
            //Handle exception
            return false;
        }  
    }
}