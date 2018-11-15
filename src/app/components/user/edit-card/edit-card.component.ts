import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {
  public flag: boolean;
  public flag2: boolean;
  public flag3: boolean;
  public flag4: boolean;
  public flag5: boolean;
  constructor() {
    this.flag = this.flag2 = this.flag3 = this.flag4 = this.flag5 = true;
   }

  ngOnInit() {
  }

}
