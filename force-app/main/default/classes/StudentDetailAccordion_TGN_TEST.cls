/* Generated by TestGen on Mon May 2 2022 at 6:11 PM (GMT) */
@isTest
private class StudentDetailAccordion_TGN_TEST{
    @isTest
    private static void getCertificationsForStudent_TGN_TEST(){
        Test.startTest();
        try{
        StudentDetailAccordion.getCertificationsForStudent('001x00000000000AAA');
        }catch(Exception e){}
        try{
        StudentDetailAccordion.getCertificationsForStudent(null);
        }catch(Exception e){}
        Test.stopTest();
    }
    @isTest
    private static void StudentDetailAccordion_TGN_TEST(){
        StudentDetailAccordion obj = new StudentDetailAccordion();
    }
}