public with sharing class FileUploaderClass {

    @AuraEnabled(cacheable=true)
   public static String uploadFile(String base64, String filename, String filerecId) {
         ContentVersion cv = createContentVersion(base64, filename);
         ContentDocumentLink cdl = createContentLink(cv.Id, filerecId);
         if (cv == null || cdl == null) { return null; }
         return cdl.Id;
   }
 
   private static ContentVersion createContentVersion(String base64, String filename) {
     ContentVersion cv = new ContentVersion();
     cv.VersionData = EncodingUtil.base64Decode(base64);
     cv.Title = filename;
     cv.PathOnClient = filename;
     try {
       insert cv;
       return cv;
     } catch(DMLException e) {
       System.debug(e);
       return null;
     }
   }
 
 
   private static ContentDocumentLink createContentLink(String contentVersionId, String filerecId) {
               if (contentVersionId == null || filerecId == null) { return null; }
     ContentDocumentLink cdl = new ContentDocumentLink();
     cdl.ContentDocumentId = [
       SELECT ContentDocumentId 
       FROM ContentVersion 
       WHERE Id =: contentVersionId
     ].ContentDocumentId;
     cdl.LinkedEntityId = filerecId;
 
     cdl.ShareType = 'V';
     try {
       insert cdl;
       return cdl;
     } catch(DMLException e) {
       System.debug(e);
       return null;
     }
   }
 }