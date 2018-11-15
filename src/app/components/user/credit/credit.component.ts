import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card';
import { UserService } from 'src/app/services/user.service';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  id: number;
  cards: Card[];
  counter = 0;
  edit = 'Editar tarjeta';
  constructor(private userservice: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
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
  showEdit() {
    this.counter++;
    if ( this.counter % 2 !== 0 ) {
      this.edit = 'Ocultar';
    } else {
      this.edit = 'Editar tarjeta';
    }
  }
  delete(id: number): void  {
    this.userservice.deletecard(id).subscribe((result: Boolean) => {
      console.log(result);
      if (result) {
        this.ngOnInit();
      }
      });
  }
}
