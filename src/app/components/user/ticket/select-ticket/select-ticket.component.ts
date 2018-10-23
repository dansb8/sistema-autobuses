import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router'
@Component({
  selector: 'app-select-ticket',
  templateUrl: './select-ticket.component.html',
  styleUrls: ['./select-ticket.component.css']
})
export class SelectTicketComponent implements OnInit {

  constructor(private router: Router) { }
  select(selectdform: NgForm): void{
    this.router.navigate(['/user/ticket/pay']);
  }
  ngOnInit() {
  }

}
