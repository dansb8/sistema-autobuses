import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: Boolean = true;
  user: User;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getCat(2).subscribe( ( user: User ) => {
        this.user = user;
        console.log(user.name);
        this.loading = false;
      });
  }

}
