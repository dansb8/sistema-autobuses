import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router'
@Component({
  selector: 'app-select-ticket',
  templateUrl: './select-ticket.component.html',
  styleUrls: ['./select-ticket.component.css']
})
export class SelectTicketComponent implements OnInit {
  public passengers:[
    "",
    "",
    "",
    "",
    ""
  ];
  public numpass;
  constructor(private router: Router) { }
  selectNum(numboletos): void{
    this.numpass=numboletos;
  }
  selectVal(selectform: NgForm): void{
    console.log(this.numpass);
    this.router.navigate(['/user/ticket/pay']);
  }
  ngOnInit() {
    
  }

}
