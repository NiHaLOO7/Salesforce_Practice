global class ats_SendEmailForSLACrossedCases implements Database.Batchable<sObject>, Database.Stateful {
    Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
    String[] address=new String[]{};
    String displayName='WCMC PM Gen Case SLA Email Notification - '+date.today().format();
   	global Database.QueryLocator start(Database.BatchableContext BC) {
        /*String query = 'SELECT Id,CaseNumber,Case_Assign_User_Name__c,Case_Resolution_Target_DT__c,Is_SLA_Crossed__c,Owner.email,Status FROM Case WHERE Status IN (' + 
                       '\'' + 'Pending' + '\''+	',' +
            		   '\'' + 'Awaiting Assignment' + '\'' + ',' + 
                       '\'' + 'In Progress' + '\'' + ')' +
                       ' and Is_SLA_Crossed__c = '+
                       '\'' + 'Y' + '\'' + ' LIMIT 5'; */
        String query = 'SELECT Id, CreatedDate, Case_Display_Name__c,Owner.email, Case_Age_Days_del__c, Case_Type__c, Sub_Category_Type__c FROM Case LIMIT 10';
        System.debug('Queryyyyyyyyy'+query);
        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext BC, List<Case> SLACrossedList) {       
        address.add('yamini.yanamala@capgemini.com'); 
        message.setToAddresses(address);
        message.setSenderDisplayName(displayName); 
        message.setReplyTo('no-reply@company.com');
        message.setSubject('List of cases that have crossed SLA dates (Appian auto-email)');
        message.setUseSignature(false); 
        message.setBccSender(false); 
        message.setSaveAsActivity(false);
        
        String htmlBody = '';
        String name;
        htmlBody= '<STYLE type="text/css">'+
          'TH {font-size: 11px; font-face: arial;background: #CCCCCC;border-width: 1;text-align: center }'+ 
          'TD  {font-size: 11px; font-face: verdana }'+ 
          'TABLE {border: solid #CCCCCC; border-width: 1}'+
          'TR {border: solid #CCCCCC; border-width: 1} </STYLE>'+        
          '<font face="arial" size="2"> <p>Dear '+ name+','+'</p>'+
          '<p>Following cases crossed SLA Date. </p>'+'<P>Case Detail:</P>'+
          '<table border="5" >'+
          '<tr >'+               
           	   '<th>Case ID</th>'+
               '<th>Case Creation Date</th>'+
               '<th>Case Type</th>'+
               '<th>Sub Category Type</th>'+
               '<th>Case Age</th>'+
            '</tr>'; 
    	   for(Case a:SLACrossedList){
               
               String caseId=a.Case_Display_Name__c;
               Datetime caseCreationDate=a.CreatedDate;
               String caseType=a.Case_Type__c;
               String subCategory=a.Sub_Category_Type__c;
               String age=a.Case_Age_Days_del__c;
               htmlBody += '<tr><td>' + caseId + '</td><td>' + caseCreationDate + 
                           '</td><td>'+ caseType +'</td><td>' + subCategory + '</td><td>' + age + '</td></tr>';
           } 
           htmlBody += '</table>';
           htmlBody+= '<p>This table only contains the first 20 cases that have crossed SLA. For more details please '+ 
                       'apply ‘SLA Crossed’ filter on Appian Reports page and download Reports. This is a system generated email. '+
                       'Kindly do not respond to this.</P';
           message.setHtmlBody(htmlBody);  
           Messaging.sendEmail(new Messaging.SingleEmailMessage[] { message });
    }  
    global void finish(Database.BatchableContext BC) {
           
    }
}