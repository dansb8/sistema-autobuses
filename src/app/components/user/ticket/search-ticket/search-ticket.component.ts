import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrls: ['./search-ticket.component.css']
})
export class SearchTicketComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor(private router: Router) {
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
  }
  
}
