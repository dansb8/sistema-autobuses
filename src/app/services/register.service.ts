import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router'
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http:HttpClient, private router: Router) { }
  register(user: User): void{
    console.log(user);
    const headers = new HttpHeaders({
      'first_name': `${user.first_name}`,
      'last_name_p': `${user.last_name_p}`,
      'last_name_m': `${user.last_name_m}`,
      'tel': `${user.tel}`,
      'email': `${user.email}`,
      'password': `${user.password}`,
      'rfc': `${user.rfc}`
    });
    this._http.post<Boolean>('http://192.168.0.25:8000/api/user/register/',null,{headers}).subscribe((result: Boolean)=>{
        console.log(result);
        if(result){
          this.router.navigate(['/home']);
        }
        else{
          alert("correo ya registrado");
        }
    }
    );
  }
}
