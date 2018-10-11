
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {DirectoryComponent} from './components/directory/directory.component'
import {SearchComponent} from './components/search/search.component'
import {UserComponent} from './components/user/user.component'
import {TicketComponent} from './components/user/ticket/ticket.component'
import {PersonalComponent} from './components/user/personal/personal.component'
import {ReportComponent} from './components/user/report/report.component'
import {CreditComponent} from './components/user/credit/credit.component'
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'directorio', component: DirectoryComponent},
  { path: 'busqueda', component: SearchComponent},
  { 
    path: 'user', component: UserComponent,
    children: [
      { path: 'ticket' , component: TicketComponent},
      { path: 'personal' , component: PersonalComponent},
      { path: 'report' , component: ReportComponent},
      { path: 'cards' , component: CreditComponent},
      { path: '' ,redirectTo: 'ticket', pathMatch: 'full'}
    ] 
  },
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
