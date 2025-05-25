import { LightningElement, track, wire } from 'lwc';
import getMainOpportunities from '@salesforce/apex/OpportunityLWCController.getMainOpportunities';
import updateOpportunityStage from '@salesforce/apex/OpportunityLWCController.updateOpportunityStage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OpportunityBoard extends LightningElement {
  @track opportunities = [];

  // Dynamically extract unique stage names
  get stageList() {
    const stages = new Set(this.opportunities.map(opp => opp.StageName));
    return Array.from(stages);
  }

  get columns() {
    return this.stageList.map(stage => ({
      stage,
      opportunities: this.opportunities.filter(opp => opp.StageName === stage)
    }));
  }

  @wire(getMainOpportunities)
  wiredOpps({ error, data }) {
    if (data) {
      this.opportunities = data;
    } else if (error) {
      console.error('Error fetching opportunities', error);
    }
  }

  handleOpportunityDrop(event) {
  const { opportunityId, newStage } = event.detail;

    updateOpportunityStage({ opportunityId, newStage })
      .then(() => {
        // Update local state for instant UI feedback
        this.opportunities = this.opportunities.map(opp => {
        if (opp.Id === opportunityId) {
          // Create a new object with updated stage
          return {
            ...opp,
            StageName: newStage
          };
        } else {
          // Return the same opportunity if no match
          return opp;
        }
      });

        // Optional: show toast
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Opportunity stage updated',
            variant: 'success'
          })
        );
      })
      .catch(error => {
        console.error('Error updating stage:', error);
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Error',
            message: 'Failed to update opportunity',
            variant: 'error'
          })
        );
      });
  }



}