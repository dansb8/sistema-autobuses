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
      'numbers': '1234567890001234',
      'nip': '1234',
      'company': 'visa',
      'expiration': '01/20'
    },
  {
      'user': 'Daniel Fermin',
      'numbers': '1234567567001234',
      'nip': '3434',
      'company': 'visa',
      'expiration': '05/20'
  },
  {
      'user': 'Carlos Alberto',
      'numbers': '1234567567029834',
      'nip': '3420',
      'company': 'masterCard',
      'expiration': '11/20'
  }];

  constructor() { }

  ngOnInit() {
  }

}
