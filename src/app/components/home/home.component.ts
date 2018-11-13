import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { User} from '../login/user'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: Boolean =true;
 
  constructor() { }

  ngOnInit() {
  }

}
