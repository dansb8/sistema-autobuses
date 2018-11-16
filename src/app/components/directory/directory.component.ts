import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Terminal } from 'src/app/interfaces/terminal';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
terminals: Terminal[];
total: any;
numpag: any;
curpag: any;
  constructor(private authService: AuthService,private termService: TerminalService) { 
    if(!this.authService.loggedin && !this.authService.prueba){
      this.authService.logout();
    }
    this.curpag=1;
    if(!this.authService.prueba){
      this.termService.gettotalterm().subscribe((res:Number)=>{
        this.total=res;
        this.numpag=this.total/6;
        if(this.total%6!=0)
        this.numpag++;
      });
    }
    else{
      this.numpag=3;
    }

  }
  ngOnInit() {
    if(this.authService.prueba){
      this.total=25;
      if(this.curpag==1)
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
      else
      this.terminals=[{
        id: 1,
        city: "Culiacan",
        name: "Central Camionera CUL",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state:"CUL"
      },
      {
        id: 2,
        city: "Chiapas",
        name: "Central Camionera CHI",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state:"CHI"
      }];
    }else{
      this.termService.getterminals(this.curpag).subscribe((terminals: Terminal[])=>{
        this.terminals=terminals;
      })
    }
  }
  pageChanged(event: any): void {
    this.curpag = event.page;
    console.log(this.curpag);
    this.ngOnInit();
  }

}
