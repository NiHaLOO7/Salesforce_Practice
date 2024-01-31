public with sharing class ats_FilteredTableController {
    
    @AuraEnabled
    public List<comment> commentList {get;set;}
    
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(
        String casenumber,
        String accountname,
        String contactname,
        String cat,
        String status,
        String typu
        
        
    ) {
        String query;
        String condition = (String.isNotBlank(casenumber)
                            ? 'CaseNumber LIKE \'' + '%' + casenumber + '%\''
                            : '');
        
        condition += (String.isNotBlank(accountname)
                      ? (String.isNotBlank(condition) ? +' AND ' : '') +
                      ' Accountname__c LIKE \'' +
                      '%' +
                      accountname +
                      '%\''
                      : '');
        
        condition += (String.isNotBlank(contactname)
                      ? (String.isNotBlank(condition) ? +' AND ' : '') +
                      ' Contactname__c LIKE \'' +
                      '%' +
                      contactname +
                      '%\''
                      : '');
        
        condition += (String.isNotBlank(cat)
                      ? (String.isNotBlank(condition) ? +' AND ' : '') +
                      ' Sub_Category_Type__c LIKE \'' +
                      '%' +
                      cat +
                      '%\''
                      : '');
        
        
        condition += (String.isNotBlank(status)
                      ? (String.isNotBlank(condition) ? +' AND ' : '') +
                      ' Status LIKE \'' +
                      '%' +
                      status +
                      '%\''
                      : '');
        
        condition += (String.isNotBlank(typu)
                      ? (String.isNotBlank(condition) ? +' AND ' : '') +
                      ' Case_Type__c LIKE \'' +
                      '%' +
                      typu +
                      '%\''
                      : '');
        
        
        //System.debug('condition ' + condition);
        if (String.isNotBlank(condition))
        {
            query ='SELECT CaseNumber,Case_Date__c,TSYS_External_Account_ID__c,Case_Type__c,Sub_Category_Type__c,Status,Case_Assign_User_Name__c,Pending_Until_DT__c FROM Case  WHERE ' +condition +' ORDER BY CaseNumber';
            //query = query +'WITH SECURITY_ENFORCED';
        } 
        
        else
        {
            query='';
            
            
        }
        System.debug('query ' + query);
        List<Case> records = Database.query(query);
        
        return records;
        
        
    }
    
    
    @AuraEnabled(cacheable=true)
    public static list<Case> getCase(Id crecordId) {
        return [SELECT Id, Question__c, Answer__c,OwnerId, Owner.name,Status, Case_Assign_User_Name__c, Comments__c, Description, CreatedDate, CreatedById, LastModifiedById, Sub_Category_Type__c, Case_Display_Name__c FROM Case WHERE ID =:crecordId WITH SECURITY_ENFORCED];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<ContentDocument> getContentDocs(Id arecordId)
    {   
        List<ContentDocumentLink> CDLs = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :arecordId WITH SECURITY_ENFORCED];
        if (CDLs.size() < 1) return new List<ContentDocument>(); 
        
        // Make a List of ContentDocument IDs
        List <Id> CDIdList = new List <Id> ();
        for (ContentDocumentLink nextCDL : CDLs) {
            CDIdList.add(nextCDL.ContentDocumentId); }        
        
        List<ContentDocument> entries = [SELECT Id, Title, CreatedById, CreatedDate, FileType FROM ContentDocument WHERE ContentDocument.Id IN :CDIdList WITH SECURITY_ENFORCED];
        return entries;
    }
    
    
    @AuraEnabled(cacheable=true)
    public static list<Case_Detail__c> getCaseDetails() {
        return [SELECT Id, LastModifiedById, Name, CreatedDate, Comments__c, Type__c, Case_Event_Note__c, Step_Resolution_Comments__c FROM Case_Detail__c WHERE Type__c='Event' WITH SECURITY_ENFORCED];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<comment> getComments(Id gccrecordId) {
        
        List<comment> commentList = new List<comment>();
        List<Case_Detail__c> lstDetails =  [SELECT Id, LastModifiedById,LastModifiedBy.Name,CreatedBy.Name, is_Migrated__c, CreatedDate, CreatedById, LastModifiedDate, Insert_By_User__c, Insert_Time__c, Updated_By_User__c, Update_Time__c, Comments__c, Type__c, Case_Event_Note__c, Name  FROM Case_Detail__c WHERE Type__c='Comment' and Case__c=:gccrecordId WITH SECURITY_ENFORCED];
        
        for(Case_Detail__c det : lstDetails){
            comment cmt = new comment();
            if(!det.is_Migrated__c){
                cmt.modifiedBy = det.LastModifiedBy.Name;
                cmt.insertBy = det.CreatedBy.Name;
                cmt.modifiedDate = String.valueOf(date.valueOf(det.LastModifiedDate));
                cmt.insertDate = String.valueOf(date.valueOf(det.CreatedDate));
                cmt.commentsText = det.Comments__c;
                
            } else {
                cmt.modifiedBy = det.Updated_By_User__c;
                cmt.insertBy = det.Insert_By_User__c;
                cmt.modifiedDate = String.valueOf(det.Update_Time__c);
                cmt.insertDate = String.valueOf(det.Insert_Time__c);
                cmt.commentsText = det.Comments__c;
            }
            
            commentList.add(cmt);
            system.debug('Comment List'+commentList);
        }
        
        return commentList;
    }
    
    
    
    public class comment{
        
        @AuraEnabled
        public String modifiedBy{get;set;}
        @AuraEnabled
        public String modifiedDate{get;set;}
        @AuraEnabled
        public String insertBy{get;set;}
        @AuraEnabled
        public String insertDate{get;set;}
        @AuraEnabled
        public String commentsText{get;set;}
        
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<events> getEvents(Id gerecordId) {
        
        List<events> eventsList = new List<events>();
        List<Case_Detail__c> lstDetails =  [SELECT Id, LastModifiedById,LastModifiedBy.Name,CreatedBy.Name, is_Migrated__c, CreatedDate, CreatedById, LastModifiedDate, Insert_By_User__c, Insert_Time__c, Updated_By_User__c, Update_Time__c, Comments__c, Type__c, Case_Event_Note__c, Name  FROM Case_Detail__c WHERE Type__c='Event' and Case__c=:gerecordId WITH SECURITY_ENFORCED];
        
        for(Case_Detail__c det : lstDetails){
            events evt = new events();
            if(!det.is_Migrated__c){
                evt.Id = det.Id;
                evt.modifiedBy = det.LastModifiedBy.Name;
                evt.insertBy = det.CreatedBy.Name;
                evt.modifiedDate = String.valueOf(date.valueOf(det.LastModifiedDate));
                evt.insertDate = String.valueOf(date.valueOf(det.CreatedDate));
                evt.eventsText = det.Case_Event_Note__c;
                evt.actionType = det.Type__c;
                
            } else {
                evt.Id = det.Id;
                evt.modifiedBy = det.Updated_By_User__c;
                evt.insertBy = det.Insert_By_User__c;
                evt.modifiedDate = String.valueOf(det.Update_Time__c);
                evt.insertDate = String.valueOf(det.Insert_Time__c);
                evt.eventsText = det.Case_Event_Note__c;
                evt.actionType = det.Type__c;
                
            }
            
            eventsList.add(evt);
            system.debug('Event List'+eventsList);
        }
        
        return eventsList;
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<documents> getDocuments(Id gdrecordId) {
        List<documents> docsList = new List<documents>();
        
        List<ContentDocumentLink> CDLs = [SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = :gdrecordId WITH SECURITY_ENFORCED];
        List <Id> CDIdList = new List <Id> ();
       
        List<Case_Detail__c> lstDetails =  [SELECT Id, LastModifiedById, Case_Ref_Id__c,Document_Ref_Id__c , Document_Folder_Name__c  ,LastModifiedBy.Name,CreatedBy.Name, is_Migrated__c, CreatedDate, CreatedById, LastModifiedDate, Insert_By_User__c, Insert_Time__c, Updated_By_User__c, Update_Time__c, Comments__c, Type__c, Case_Event_Note__c, Name  FROM Case_Detail__c WHERE Type__c='Document' and Case__c=:gdrecordId WITH SECURITY_ENFORCED];
        for(Case_Detail__c det : lstDetails){
            documents doc = new documents();
            doc.Id = det.Id;
            doc.title = det.Document_Ref_Id__c;
            doc.modifiedBy = det.Updated_By_User__c;
            doc.insertBy = det.Insert_By_User__c;
            doc.modifiedDate = String.valueOf(det.Update_Time__c);
            doc.insertDate = String.valueOf(det.Insert_Time__c);
            docsList.add(doc);
        }
        
        for (ContentDocumentLink nextCDL : CDLs) {
            CDIdList.add(nextCDL.ContentDocumentId);
        }        
        List<ContentDocument> entries = [SELECT Id, Title, CreatedById,CreatedBy.Name, CreatedDate, FileType FROM ContentDocument WHERE ContentDocument.Id IN :CDIdList WITH SECURITY_ENFORCED];
        system.debug('Event List'+docsList);
        for(ContentDocument det : entries){
            documents doc = new documents();
            doc.Id = det.Id;
            doc.title = det.title;
            doc.insertBy = det.CreatedBy.Name;
            doc.insertDate = String.valueOf(date.valueOf(det.CreatedDate));
            docsList.add(doc);
        }
        system.debug('Documents List'+docsList);
        return docsList;
    }
    
    
    public class events{
        
        @AuraEnabled
        public String Id{get;set;}
        @AuraEnabled
        public String modifiedBy{get;set;}
        @AuraEnabled
        public String modifiedDate{get;set;}
        @AuraEnabled
        public String insertBy{get;set;}
        @AuraEnabled
        public String insertDate{get;set;}
        @AuraEnabled
        public String eventsText{get;set;} 
        @AuraEnabled
        public String actionType{get;set;}
        
    }
    
    
    public class documents{
        
        @AuraEnabled
        public String title{get;set;}
        @AuraEnabled
        public String modifiedBy{get;set;}
        @AuraEnabled
        public String modifiedDate{get;set;}
        @AuraEnabled
        public String insertBy{get;set;}
        @AuraEnabled
        public String insertDate{get;set;}
        @AuraEnabled
        public String eventsText{get;set;} 
        @AuraEnabled
        public String actionType{get;set;}
        @AuraEnabled
        public String Id{get;set;}
        
    }

}