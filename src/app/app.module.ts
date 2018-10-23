import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//componentes
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { TicketComponent } from './components/user/ticket/ticket.component';
import { ReportComponent } from './components/user/report/report.component';
import { PersonalComponent } from './components/user/personal/personal.component';
import { CreditComponent } from './components/user/credit/credit.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { AdminComponent } from './components/admin/admin.component';
import { BusComponent } from './components/admin/bus/bus.component';
import { TerminalComponent } from './components/admin/terminal/terminal.component';
import { RoutesComponent } from './components/admin/routes/routes.component';
import { UsersComponent } from './components/admin/users/users.component';
import { TicketsComponent } from './components/admin/tickets/tickets.component';
import { ShellComponent } from './shell/shell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//rutas
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    UserComponent,
    TicketComponent,
    ReportComponent,
    PersonalComponent,
    CreditComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    DirectoryComponent,
    AdminComponent,
    BusComponent,
    TerminalComponent,
    RoutesComponent,
    UsersComponent,
    TicketsComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
