import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {

public flag: boolean;
model: string;
capacity: Number;
form_control: string;
types: Number; 
  constructor(){
    this.flag = true;
    this.model = '12easd3';
    this.capacity = 38;
    this.form_control= 'ASDC-5845-8286-AS41';
    this.types=0;
     }

  ngOnInit() {
  }

}
