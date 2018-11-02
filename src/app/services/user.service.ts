import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from '../components/login/user'
import { Card } from '../interfaces/card'
//export interface User {
  //name: string;
//}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://192.168.0.25:8000/api/Users');
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>('http://192.168.0.25:8000/api/cats/' + id);
  }

  insertUser(User: User): Observable<User> {
    return this.http.post<User>('http://192.168.0.25:8000/api/Users/', User);
  }

  updateUser(User: User): Observable<void> {
    return this.http.put<void>('http://192.168.0.25:8000/api/Users/' + User.userName, User);
  }

  deleteUser(name: string) {
    return this.http.delete('http://192.168.0.25:8000/api/Users/' + name);
  }

  //tarjetas
  showcards(id: number): Observable<Card[]> {
    const headers = new HttpHeaders({
      'id': `${id}`
    });
    return this.http.post<Card[]>('http://192.168.10.153:8000/api/cards/request/',null,{headers});
  }
  deletecard(id: number): Observable<Boolean>{
    const headers = new HttpHeaders({
      'id': `${id}`
    });
    console.log(id);
    return this.http.post<Boolean>('http://192.168.10.153:8000/api/cards/delete/',null,{headers});
  }
}
