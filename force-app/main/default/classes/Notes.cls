public with sharing class Notes {
    
    @AuraEnabled
    public static list<Notes__c> fetchNotes(){
        return [SELECT Id, Title__c, Status__c FROM Notes__c];
    }
    
    @AuraEnabled
    public static Boolean completeTask(List<String> noteIds){
        system.debug('Note ID -----> ' + noteIds );
        List<Notes__c> lstNotes = [SELECT Status__c FROM Notes__c WHERE Id IN :noteIds];
        system.debug('Query result -----> ' + lstNotes );
        
        if(lstNotes != null && !lstNotes.isEmpty()){
            for(Notes__c note : lstNotes){
                note.Status__c = 'Completed';
            }
        }
        
        try{
            if(!lstNotes.isEmpty()){
                update lstNotes;
            }
            return true;
            
        }catch(DMLException e){
            System.debug(e);
            return false;
        }
    }
    
    @AuraEnabled
    public static Notes__c createNoteRecord(String strTitle){
        Notes__c note = new Notes__c();
        note.Title__c = strTitle;
        note.Status__c = 'Pending';
        insert note;
        return note; 
    }
    
}