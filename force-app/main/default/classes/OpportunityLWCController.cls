public with sharing class OpportunityLWCController {
	@AuraEnabled(cacheable=true)
    public static List<Opportunity> getMainOpportunities() {
        return [
            SELECT Id, Name, Amount, StageName
            FROM Opportunity
            WHERE StageName IN ('Prospecting', 'Qualification', 
                                'Value Proposition', 'Closed Won', 'Closed Lost')
            ORDER BY StageName, LastModifiedDate DESC
        ];
    }
    
    @AuraEnabled
    public static void updateOpportunityStage(String opportunityId, String newStage) {
        Opportunity opp = [SELECT Id, StageName FROM Opportunity WHERE Id = :opportunityId LIMIT 1];
        opp.StageName = newStage;
        update opp;
	}

}