import { LightningElement, track } from 'lwc';

export default class OpportunityBoard extends LightningElement {
  @track opportunities = [
    { Id: '001', Name: 'Deal 1', Amount: 5000, StageName: 'Qualification' },
    { Id: '002', Name: 'Deal 2', Amount: 8000, StageName: 'Proposal' },
    { Id: '003', Name: 'Deal 3', Amount: 12000, StageName: 'Closed Won' },
    { Id: '004', Name: 'Deal 3', Amount: 12000, StageName: 'Qualification' }
  ];

  stageList = ['Qualification', 'Proposal', 'Closed Won', 'Closed Lost'];

  get columns() {
    return this.stageList.map(stage => ({
      stage,
      opportunities: this.opportunities.filter(opp => opp.StageName === stage)
    }));
  }

  handleOpportunityDrop(event) {
    const { opportunityId, newStage } = event.detail;

    this.opportunities = this.opportunities.map(opp =>
      opp.Id === opportunityId ? { ...opp, StageName: newStage } : opp
    );
  }
}


