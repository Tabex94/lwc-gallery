import { LightningElement, api } from 'lwc';

export default class OpportunityCard extends LightningElement {
  @api opportunity;

  handleDragStart(event) {
    // Passing the Opportunity Id through the dataTransfer object
    event.dataTransfer.setData('text/plain', this.opportunity.Id);

    // Optional: Dispatch a custom event if needed
    const dragEvent = new CustomEvent('oppdragstart', {
      detail: { opportunityId: this.opportunity.Id }
    });
    this.dispatchEvent(dragEvent);
  }
}