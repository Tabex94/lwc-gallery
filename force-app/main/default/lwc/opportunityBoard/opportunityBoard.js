import { LightningElement, track, wire } from 'lwc';
import getMainOpportunities from '@salesforce/apex/OpportunityLWCController.getMainOpportunities';

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
    // We ignore this for now, as you said no record updates yet.
    console.log('Drop detected (not persisted):', event.detail);
  }
}



