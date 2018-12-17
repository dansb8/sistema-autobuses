import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService} from 'src/app/services/auth.service';
import { ticket } from 'src/app/interfaces/ticket';
@Component({  
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  Purchase: any [];



  constructor(private userservice: UserService,private authService: AuthService) {
   
   }

  ngOnInit() {
    if(this.authService.prueba){
      this.Purchase=[{
        date:"12-05-18",
        schedule:"10:00",
        origin: "AGS",
        destination: "CAL",
        passengers: [{
          name:"Daniel Romo",

        }],
        card:{
          name: "Daniel Romo",
          num:"XXXX-XXXX-XXXX-1234"
        }

      }]
    }
  }

}