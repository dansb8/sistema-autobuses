import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router';
import { TicketComponent } from './ticket.component'
import { SearchTicketComponent } from './search-ticket/search-ticket.component';

const ticketroutes: Routes =[
  {path: 'ticket', component: TicketComponent, children:[
    { path : 'search', component: SearchTicketComponent},
    {path: '', pathMatch: 'full', redirectTo: 'search'},
  ] ,pathMatch: 'full'},

];
@NgModule({
  imports: [
    RouterModule.forChild(ticketroutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class TicketRoutingModule { }
