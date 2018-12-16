import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Terminal } from 'src/app/interfaces/terminal';
import { TerminalService} from 'src/app/services/terminal.service';
import { Schedule } from 'src/app/interfaces/schedule';
import { TabHeadingDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  terminals: Terminal[];
  destinations: Terminal[];
  times: Schedule[];
  origin: Terminal;
  destination: Terminal;
  search_valid: boolean;
  origsel: boolean;
  destsel: boolean;
  prueba: boolean;
  constructor(private terminalservice: TerminalService) {
    this.origsel=false;
    this.destsel=false;
    this.search_valid=false;
    this.prueba=false;
    if(this.prueba){
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
      this.times=[{
        id: 1,
        time: "10:20",
        cost:120.00,
        iva:0.16
      },
      {
        id:2,
        time:"12:00",
        cost:145.50,
        iva:0.16
      }]
    }
   }
  
  ngOnInit() {
    if(!this.prueba)
    this.checkOrig();
  }
  search(searchForm: NgForm): void{
    if(!this.prueba)
    if (searchForm && searchForm.valid){
      const origen = this.origin.id
      const destino = this.destination.id;
      console.log(this.origin.name+"\n"+this.destination.name+"\n");
      //this.router.navigate(['/user/ticket/select']);
      this.checkHora()
      this.search_valid=true;
      
    } else {
      console.log("error");
    }
    else
    this.search_valid=true;
  }
  nueva(){
    this.search_valid=false
  }
  checkOrig(){
    if(!this.prueba)
    this.terminalservice.getorigins().subscribe((origins: Terminal[])=>{
      this.terminals=origins;
    });
    
  }
  checkDest(){
    this.origsel=true;
    console.log(this.origin);
    if(!this.prueba)
    this.terminalservice.getdestinations(this.origin.id).subscribe((destinations: Terminal[])=>{
      this.destinations=destinations;
    });
    
  }
  checkHora(){
    this.destsel=true;
    this.terminalservice.getschedules(this.origin.id,this.destination.id).subscribe((times: Schedule[])=>{
      this.times=times;
    });
  }
}
