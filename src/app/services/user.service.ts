import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from '../components/login/user'
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
}
