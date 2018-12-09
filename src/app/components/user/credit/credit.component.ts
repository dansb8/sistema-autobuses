import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card';
import { UserService } from 'src/app/services/user.service';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  id: number;
  cards: Card[];
  addnew: boolean;
  details: boolean;
  report: any[];
  constructor(private userservice: UserService, private authService: AuthService, private router: Router) {
    this.report=[{
      message:"mensaje 1",
      date: "12/12/2018",
      time: "18:25:30"
    },
    {
      message:"mensaje 2",
      date: "12/12/2019",
      time: "21:25:30"
    }]
   }

  ngOnInit() {
    this.addnew=false
    if( this.authService.prueba){
      this.cards=[
        {id: 1,
        type: "debito",
        company: "Visa",
        number: "1234567891233",
        owner: this.authService.currentUser.userName,
        date: "10/21"
        },
        {
          id: 2,
          type: "debito",
          company: "MasterCard",
          number: "1234567891233",
          owner: this.authService.currentUser.userName,
          date: "10/21"
        },
        {
          id: 3,
          type: "debito",
          company: "Visa",
          number: "1234567891233",
          owner: this.authService.currentUser.userName,
          date: "10/21"
        }
      ]
    }
    else{
      this.id=this.authService.currentUser.id;
      this.userservice.showcards(this.id).subscribe((cards: Card[])=>{
        this.cards=cards;
        console.log(cards);
      });
    }
    
  }
 toggleNew(){
   if(this.addnew){
     this.addnew=false
   }
   else
   this.addnew=true
 }
  delete(id: number): void  {
    this.userservice.deletecard(id).subscribe((result: Boolean) => {
      console.log(result);
      if (result) {
        this.ngOnInit();
      }
      });
  }
  toggledetails(id: number):void{
    if(this.details)
    this.details=false
    else
    this.details=true
    if(!this.authService.prueba){
      this.userservice.carddetails(id).subscribe((res: any)=>{
        this.report=res;
      })
    }
  }
}
