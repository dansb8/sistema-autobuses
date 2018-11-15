import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
public flag: boolean;
public NameT: string;
public Colonia: string;
public Street: string
public Ninterno: number;
public Nexterno: number;
public Phone: string;
public CodePostal: string;
  constructor() { 
    this.flag=true;
    this.NameT='Aguascalientes';
    this.Colonia='Santa Elena';
    this.Street='T.Chavez';
    this.Ninterno=0;
    this.Nexterno=106;
    this.Phone='9612492986';
    this.CodePostal='29045';


  }

  ngOnInit() {
  }

}
