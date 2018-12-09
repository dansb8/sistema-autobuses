import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apiback } from 'src/app/apiback';
import { Terminal} from 'src/app/interfaces/terminal';
import {Schedule} from 'src/app/interfaces/schedule';
import {Seats} from 'src/app/interfaces/seats';
import { Paydata } from '../interfaces/paydata';
import { Payresp } from '../interfaces/payresp';
@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(private http: HttpClient) { }
  getterminals(pag: number): Observable<Terminal[]>{
    const headers = new HttpHeaders({
      'pag': `${pag}`
    });
    return this.http.post<Terminal[]>(Apiback.ENDPOINT+'/api/terminal/directory/',null,{headers});
  }
  gettotalterm():Observable<number>{
    return this.http.get<number>(Apiback.ENDPOINT+'/api/terminal/total');
  }
  getorigins():Observable<Terminal[]>{
    return this.http.post<Terminal[]>(Apiback.ENDPOINT+'/api/terminal/origins/',null,{withCredentials:true});
  }
  getdestinations(id: number): Observable<Terminal[]>{
    const headers = new HttpHeaders({
      'id': `${id}`
    });
    return this.http.post<Terminal[]>(Apiback.ENDPOINT+'/api/terminal/destinations/',null,{headers,withCredentials:true});
  }
  getschedules(id_ori: number,id_dest: number): Observable<Schedule[]>{
    const headers = new HttpHeaders({
      'id_ori': `${id_ori}`,
      'id_dest': `${id_dest}`
    })
    return this.http.post<Schedule[]>(Apiback.ENDPOINT+'/api/terminal/schedule/',null,{headers,withCredentials:true});
  }
  getSeats(id: number,date: string): Observable<Seats>{
    const headers = new HttpHeaders({
      'id_route': `${id}`,
      'fecha': `${date}`
    })
    return this.http.post<Seats>(Apiback.ENDPOINT+'/api/terminal/seats/',null,{headers,withCredentials:true})
  }
  validatePay(paydata: Paydata):Observable<Payresp>{
    const headers = new HttpHeaders({
      'id_card':`${paydata.card.id}`,
      'costo':`${paydata.total}`
    })
    return this.http.post<Payresp>(Apiback.ENDPOINT+'/api/terminal/payment/',null,{headers,withCredentials:true})
  }
  sendTicket(asiento: number,nombre: any,id:number,tipo: string,schedule: Schedule,fecha: string,cost: number,iva: number,id_card: number):Observable<boolean>{
    const headers=new HttpHeaders({
      'id_user': `${id}`,
      'seat': `${asiento}`,
      'name': `${nombre.name}`,
      'apepat': `${nombre.apepat}`,
      'apemat': `${nombre.apemat}`,
      'type': `${tipo}`,
      'id_route': `${schedule.id}`,
      'fecha': `${fecha}`,
      'cost': `${cost}`,
      'iva': `${iva}`,
      'id_card': `${id_card}`
    })
    return this.http.post<boolean>(Apiback.ENDPOINT+'/api/ticketinfo/',null,{headers,withCredentials:true})
  }

}
