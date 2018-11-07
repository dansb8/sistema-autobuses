import { Injectable } from '@angular/core';
import { User } from '../components/login/user';
import { Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null;
  loggedin: boolean;
  prueba: boolean=false;
  constructor(private _http:HttpClient, private router: Router) { }

  isLoggedIn(): boolean {
    return this.loggedin;
  }
  isAdmin(): boolean {
      return this.currentUser.isAdmin;
  }
  login(userName: string, password: string): void {
    if(this.prueba){
      this.currentUser = {
        id: 2,
        userName: userName,
        isAdmin: true
      };
      if (this.isAdmin()){
        console.log(this.isAdmin());
        this.router.navigate(['/admin']);
      } else {
          console.log(this.isAdmin());
          this.router.navigate(['/user']);
        }
      this.loggedin=true;
    }
    else{
    this.validation(userName,password).subscribe((user: User )=>{
      this.currentUser=user;
      //this.currentUser.id=user.id;
      //this.currentUser.userName=user.userName;
      //this.currentUser.isAdmin=user.isAdmin;
      if( user.id!=null){
        console.log(this.currentUser);
        if (this.isAdmin()){
          console.log(this.isAdmin());
          this.router.navigate(['/admin']);
        } else {
            console.log(this.isAdmin());
            this.router.navigate(['/user']);
          }
          this.loggedin=true;
      }else{
        alert("correo o contraseña invalidos");
        this.loggedin=false;
      }
      
    }
    );
  }
  }
  logout(): void {
    this.loggedin=false;
    this.currentUser = null;
  }
  validation(email: string, password: string): Observable<User> {
    const headers = new HttpHeaders({
      'email': `${email}`,
      'password': `${password}`
    });
    return this._http.post<User>('http://192.168.0.25:8000/api/login/',null,{headers});
  }
}