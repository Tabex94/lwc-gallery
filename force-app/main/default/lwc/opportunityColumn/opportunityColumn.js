import { LightningElement, api } from 'lwc';

export default class OpportunityColumn extends LightningElement {
  @api stageName;
  @api opportunities = [];

  handleDragOver(event) {
    event.preventDefault(); // Allows drop
  }

  handleDrop(event) {
    event.preventDefault();
    const opportunityId = event.dataTransfer.getData('text/plain');

    // Fire custom event to parent with the Opportunity ID and target stage
    const dropEvent = new CustomEvent('opportunitydrop', {
      detail: {
        opportunityId,
        newStage: this.stageName
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(dropEvent);
  }
}
