import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  constructor(private authService: AuthService) { 
    if(!this.authService.loggedin){
      this.authService.logout();
    }
  }

  ngOnInit() {
  }

}
