import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from '../components/login/user'
import { Card } from '../interfaces/card'
import { Apiback } from 'src/app/apiback'
//export interface User {
  //name: string;
//}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(Apiback.ENDPOINT+'/api/Users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(Apiback.ENDPOINT+'/api/cats/' + id);
  }

  insertUser(User: User): Observable<User> {
    return this.http.post<User>(Apiback.ENDPOINT+'/api/Users/', User);
  }

  updateUser(User: User): Observable<void> {
    return this.http.put<void>(Apiback.ENDPOINT+'/api/Users/' + User.userName, User);
  }

  deleteUser(name: string) {
    return this.http.delete(Apiback.ENDPOINT+'/api/Users/' + name);
  }

  //tarjetas
  showcards(id: number): Observable<Card[]> {
    const headers = new HttpHeaders({
      'id': `${id}`
    });
    return this.http.post<Card[]>(Apiback.ENDPOINT+'/api/cards/request/',null,{headers,withCredentials:true});
  }
  deletecard(id: number): Observable<Boolean>{
    const headers = new HttpHeaders({
      'id': `${id}`
    });
    console.log(id);
    return this.http.post<Boolean>(Apiback.ENDPOINT+'/api/cards/delete/',null,{headers,withCredentials:true});
  }
}
