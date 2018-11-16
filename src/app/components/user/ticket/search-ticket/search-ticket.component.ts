import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../../../../services/auth.service';
import { Terminal } from 'src/app/interfaces/terminal';
import { TerminalService} from 'src/app/services/terminal.service';
@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrls: ['./search-ticket.component.css']
})
export class SearchTicketComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  terminals: Terminal[];
  destinations: Terminal[];
  origin: Terminal;
  destination: Terminal;
  destsel: boolean;
  constructor(private router: Router,private authService: AuthService,private terminalservice: TerminalService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.destsel=true;
   }

   search(searchForm: NgForm): void{
    if (searchForm && searchForm.valid){
      const origen = this.origin.id
      const destino = this.destination.id;
      console.log(this.origin.name+"\n"+this.destination.name);
      this.router.navigate(['/user/ticket/select']);
    } else {
      console.log("error");
    }
  }
  ngOnInit() {
    if(this.authService.prueba){
      this.terminals=[{
        id: 1,
        city: "Aguascalientes",
        name: "Central Camionera Ags",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state:"AGS"
      },
      {
        id: 2,
        city: "Guadalajara",
        name: "Central Camionera GDL",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state:"JAL"
      }];
      this.destinations=[{
        id: 3,
        city: "Culiacan",
        name: "Central Camionera SNL",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state: "SIN"
      },
      {
        id: 1,
        city: "Teocaltiche",
        name: "Central Camionera Teocal",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state: "JAL"
      }
      ]
    }
    else{
      this.checkOrig();
    }
  }
  checkOrig(){
    this.terminalservice.getorigins().subscribe((origins: Terminal[])=>{
      this.terminals=origins;
    });
  }
  checkDest(){
    console.log(this.origin);
    this.terminalservice.getdestinations(this.origin.id).subscribe((destinations: Terminal[])=>{
      this.destinations=destinations;
    });
    this.destsel=false;
  }
  
}
