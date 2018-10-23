import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component'
import { SearchTicketComponent } from './search-ticket/search-ticket.component';
import { TicketRoutingModule } from './ticket-routing.module';
@NgModule({
    declarations: [
        TicketComponent,
        SearchTicketComponent,
    ],
    imports: [ 
        CommonModule ,
        TicketRoutingModule,
    ],
    exports: [],
    providers: [],
})
export class TicketModule {}