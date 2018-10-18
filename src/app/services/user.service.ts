import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getAllCats(): Observable<User[]> {
    return this._http.get<User[]>('http://localhost:8000/api/cats');
  }

  getCat(id: number): Observable<User> {
    return this._http.get<User>('http://localhost:8000/api/cats/' + id);
  }

  insertCat(user: User): Observable<User> {
    return this._http.post<User>('http://localhost:8000/api/cats/', user);
  }

  updateCat(user: User): Observable<void> {
    return this._http.put<void>('http://localhost:8000/api/cats/' + user.name, user);
  }

  deleteCat(name: string) {
    return this._http.delete('http://localhost:8000/api/cats/' + name);
  }
}
