import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../../../../services/auth.service';
import { Terminal } from 'src/app/interfaces/terminal';
@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrls: ['./search-ticket.component.css']
})
export class SearchTicketComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  terminals: Terminal[];
  origin: Terminal;
  destiny: Terminal;
  constructor(private router: Router,private authService: AuthService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 30);
   }

   search(searchForm: NgForm): void{
    if (searchForm && searchForm.valid){
      const origen = searchForm.form.value.origen;
      const destino = searchForm.form.value.destino;
      console.log(origen+"\n"+destino);
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
        zip: "20210"
      },
      {
        id: 2,
        city: "Guadalajara",
        name: "Central Camionera GDL",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210"
      }];
    }
  }

  checkDest() {
    console.log(this.origin);
  }
  
}
