import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/interfaces/terminal';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  terminals: Terminal[];
  newterminal: Terminal
  constructor(private adminservice: AdminService, private authservice: AuthService) {
    if(this.authservice.prueba){
      this. terminals=[{
        id: 1,
        city: "Aguascalientes",
        state: "Aguascalientes",
        name: "Central Autobuses AGS",
        address: "Av convencion 123 fracc. El dorado",
        tel: "9121212",
        zip: "20210"
      }]
    }
  }

  ngOnInit() {
  }

}
