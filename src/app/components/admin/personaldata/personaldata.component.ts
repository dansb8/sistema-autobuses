import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personaldata',
  templateUrl: './personaldata.component.html',
  styleUrls: ['./personaldata.component.css']
})
export class PersonaldataComponent implements OnInit {
  public flag: boolean;
  public flag2: boolean;
  public flag3: boolean;
  public flag4: boolean;
  public flag5: boolean;
  public countsave: number;
  public changepass: number;
  public name: string;
  public last_name1: string;
  public last_name2: string;
  public rfc: string;
  public save: String;
  public email: String;
  public cel: String;
  constructor() {
    this.flag = this.flag2 = this.flag3 = this.flag4 = this.flag5 = true;
    this.save = 'Editar';
    this.changepass = 1;
    this.name = 'Rafael Alejandro';
    this.last_name1 = 'Muñoz';
    this.last_name2 = 'Guzman';
    this.rfc = 'CUPU800825569';
    this.email = 'Rafajoto@gmail.com';
    this.cel = '449 125 8853';
  }
  ngOnInit() {
  }

}
