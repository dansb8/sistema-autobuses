import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apiback } from 'src/app/apiback';
import { Terminal} from 'src/app/interfaces/terminal';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(private http: HttpClient) { }
  getorigins():Observable<Terminal[]>{
    return this.http.post<Terminal[]>(Apiback.ENDPOINT+'/api/terminal/origins/',null,{withCredentials:true});
  }
  getdestinations(id: number): Observable<Terminal[]>{
    const headers = new HttpHeaders({
      'id': `${id}`
    });
    return this.http.post<Terminal[]>(Apiback.ENDPOINT+'/api/terminal/destinations/',null,{headers,withCredentials:true});
  }

}
