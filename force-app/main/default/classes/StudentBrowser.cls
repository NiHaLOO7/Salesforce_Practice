public with sharing class StudentBrowser {
    
    @auraEnabled(cacheable=true)
    public static List<Contact> getStudents(String instructorId, String courseDeliveryId){
        
        String query = 'select id, Name, Email, Phone, Title, Account.Name, PhotoUrl from Contact where Name <> \'\'';
        
        if (courseDeliveryId != '') {
            query = query + ' and id in (select Student__c from course_attendee__c where course_delivery__c = \'' + String.escapeSingleQuotes(courseDeliveryId) + '\')';
        } else if (instructorId != '') {
            query = query + ' and id in (select Student__c from course_attendee__c where course_delivery__r.Instructor__c = \'' + String.escapeSingleQuotes(instructorId) + '\')';                    
        }
        
        query = query + ' order by Name';
        
        List<Contact> sobjList = Database.query(query);
        return sobjList;
        
    }
    
}