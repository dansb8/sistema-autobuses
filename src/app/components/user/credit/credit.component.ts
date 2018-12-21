import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card';
import { UserService } from 'src/app/services/user.service';
import { AuthService} from '../../../services/auth.service';
import { Router } from '@angular/router';
import { toBase64String } from '@angular/compiler/src/output/source_map';
declare var $: any; // para jquery
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  blockButton = true;
  id: number;
  cards: Card[];
  addnew: boolean;
  details: boolean;
  report: any[];
  editFlag: boolean[] = [];
  constructor(private userservice: UserService, private authService: AuthService, private router: Router) {
    this.report = [{
      message:"mensaje 1",
      date: "12/12/2018",
      time: "18:25:30"
    },
    {
      message:"mensaje 2",
      date: "12/12/2019",
      time: "21:25:30"
    }];
   }

  ngOnInit() {
    // Para animacion de tarjetas
    ! function(a){
      a(function() {
           a(".button-sent #continue").click(function(b) {
              a("#area .master-card").css("transform", "rotateY(180deg)")
          }), a(".button-sent #back").click(function(b) {
              a("#area .master-card").css("transform", "rotateY(0deg)")
          }),a(".row #area #card").hover(function(b){
          })
      })}(jQuery);
    this.addnew = false;
    if ( this.authService.prueba) {
      this.cards = [
        {id: 1,
        type: "Debito",
        company: "Visa",
        number: "1234567893029762",
        owner: 'Jesus Alonso Castro Lopez',
        date: "10/21"
        },
        {
          id: 2,
          type: "Credito",
          company: "MasterCard",
          number: "8472918756430298",
          owner: 'Jesus Alonso Castro Lopez',
          date: "10/21"
        },
        {
          id: 3,
          type: "Debito",
          company: "Visa",
          number: "1623748905748936",
          owner: 'Jesus Alonso Castro Lopez',
          date: "10/21"
        },
        {id: 4,
          type: "Debito",
          company: "Visa",
          number: "1234567893029762",
          owner: 'Jesus Alonso Castro Lopez',
          date: "10/21"
          },
          {id: 5,
            type: "Debito",
            company: "Visa",
            number: "1234567893029762",
            owner: 'Jesus Alonso Castro Lopez',
            date: "10/21"
            },
            {id: 6,
              type: "Debito",
              company: "Visa",
              number: "1234567893029762",
              owner: 'Jesus Alonso Castro Lopez',
              date: "10/21"
              },
              {id: 7,
                type: "Debito",
                company: "Visa",
                number: "1234567893029762",
                owner: 'Jesus Alonso Castro Lopezasdasdadasasdasd',
                date: "10/21"
                },
                {id: 8,
                  type: "Debito",
                  company: "Visa",
                  number: "1234567893029762",
                  owner: 'Jesus Alonso Castro Lopezasdasdadasasdasd',
                  date: "10/21"
                  },
                  {id: 9,
                    type: "Debito",
                    company: "Visa",
                    number: "1234567893029762",
                    owner: 'Jesus Alonso Castro Lopezasdasdadasasdasd',
                    date: "10/21"
                    },
                    {id: 10,
                      type: "Debito",
                      company: "Visa",
                      number: "1234567893029762",
                      owner: 'Jesus Alonso Castro Lopezasdasdadasasdasd',
                      date: "10/21"
                      }
      ];
    } else {
      this.id = this.authService.currentUser.id;
      this.userservice.showcards(this.id).subscribe((cards: Card[]) => {
        this.cards = cards;
        console.log(cards);
      });
      for (let i = 0; i < this.cards.length; i++) {
        this.editFlag[i] = false;
      }
    }
  }
  getNumbers(numbers: string , start: number, size: number): string {
    let aux = '';
      for (let i = start ; i < size ; i++ ) {
        aux += numbers[i];
      }
      return aux;
  }
 toggleNew() {
   if (this.addnew) {
     this.addnew = false;
   } else {
   this.addnew = true;
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
  toggledetails(id: number): void {
    if (this.details) {
    this.details = false;
    } else {
    this.details = true;
    if (!this.authService.prueba) {
      this.userservice.carddetails(id).subscribe((res: any) => {
        this.report = res;
      });
    }
  }
}
}
