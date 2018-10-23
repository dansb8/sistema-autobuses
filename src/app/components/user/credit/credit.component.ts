import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  public numCards = 3;
  public cards = [
    {
      'user': 'Victor Manuel',
      'numbers': '1234-5678-9000-1234',
      'nip': '1234',
      'company': 'Visa',
      'expiration': '01/20'
    },
  {
      'user': 'Daniel Fermin',
      'numbers': '1234-5675-6700-1234',
      'nip': '3434',
      'company': 'Visa',
      'expiration': '05/20'
  },
  {
      'user': 'Carlos Alberto',
      'numbers': '1234-5675-6702-9834',
      'nip': '3420',
      'company': 'MasterCard',
      'expiration': '11/20'
  },
  {
    'user': 'Carlos Alberto',
    'numbers': '1234-5675-6702-9834',
    'nip': '3420',
    'company': 'MasterCard',
    'expiration': '11/20'
},
{
  'user': 'Carlos Alberto',
  'numbers': '1234-5675-6702-9834',
  'nip': '3420',
  'company': 'MasterCard',
  'expiration': '11/20'
},
{
  'user': 'Carlos Alberto',
  'numbers': '1234-5675-6702-9834',
  'nip': '3420',
  'company': 'MasterCard',
  'expiration': '11/20'
}];

  constructor() { }

  ngOnInit() {
  }

}
