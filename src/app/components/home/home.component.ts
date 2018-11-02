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
  user: User;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUser(1).subscribe( (user: User)=>{
      this.user=user;
      console.log(user.userName);
      this.loading=false;
    }
    )
  }

}
