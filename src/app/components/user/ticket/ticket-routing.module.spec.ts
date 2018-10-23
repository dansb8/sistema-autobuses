import { TicketRoutingModule } from './ticket-routing.module';

describe('TicketRoutingModule', () => {
  let ticketRoutingModule: TicketRoutingModule;

  beforeEach(() => {
    ticketRoutingModule = new TicketRoutingModule();
  });

  it('should create an instance', () => {
    expect(ticketRoutingModule).toBeTruthy();
  });
});
