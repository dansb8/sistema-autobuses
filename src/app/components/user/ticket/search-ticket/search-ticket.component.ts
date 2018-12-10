import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../../../../services/auth.service';
import { Terminal } from 'src/app/interfaces/terminal';
import { TerminalService} from 'src/app/services/terminal.service';
import { Time, formatDate } from '@angular/common';
import { Schedule } from 'src/app/interfaces/schedule';
import { Seats } from 'src/app/interfaces/seats';
import { Card } from 'src/app/interfaces/card';
import { UserService} from 'src/app/services/user.service';
import { Paydata } from 'src/app/interfaces/paydata';
import { Payresp } from 'src/app/interfaces/payresp';

@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrls: ['./search-ticket.component.css']
})
export class SearchTicketComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  terminals: Terminal[];
  destinations: Terminal[];
  times: Schedule[];
  seats: Seats;
  seatsAva:any;
  sel_seat:number[];
  aux:number[];
  origin: Terminal;
  destination: Terminal;
  fecha:Date;
  dia:string;
  time: Schedule;
  origsel: boolean;
  destsel: boolean;
  search_valid: boolean;
  select_valid:boolean;
  pay_valid:boolean;
  code_card:boolean;
  name_pas: any[];
  numboletos: number;
  cards: Card[];
  cardpay: Card;
  paydata: Paydata;
  message: string;
  showalert:boolean;
  pay_total:any;
  tipo_pas:any[];
  pay_charged:number;
  descuento:  number;
  total_iva: number;
  constructor(private router: Router,private authService: AuthService,private terminalservice: TerminalService,private userservice: UserService) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 30);
    this.origsel=false;
    this.destsel=false;
    this.search_valid=false;
    this.sel_seat=[0,0,0,0,0]
    this.aux=[0,0,0,0,0]
    this.name_pas=[{name:"",apepat:"",apemat:""},{name:"",apepat:"",apemat:""},{name:"",apepat:"",apemat:""},{name:"",apepat:"",apemat:""},{name:"",apepat:"",apemat:""}];
    this.pay_valid=false;
    this.showalert=false;
    this.tipo_pas=["","","","",""]
    this.descuento=0
  }

   search(searchForm: NgForm): void{
    if (searchForm && searchForm.valid){
      const origen = this.origin.id
      const destino = this.destination.id;
      this.dia=formatDate(this.fecha,'yyyy-MM-dd','en-US');
      console.log(this.time)
      console.log(this.origin.name+"\n"+this.destination.name+"\n"+this.dia);
      //this.router.navigate(['/user/ticket/select']);
      this.search_valid=true;
      this.checkSeats()
    } else {
      console.log("error");
    }
  }

  select(selectForm: NgForm):void{
    if(selectForm && selectForm.valid){
      let ban=true
      this.aux.length=this.numboletos
      for(let i=0;i<this.numboletos;i++){
        this.aux[i]=this.sel_seat[i];
      }
      this.aux.sort()
      console.log(this.aux)
      console.log(this.name_pas)
      console.log(this.tipo_pas)
      this.descuento=0
      for(let i=0;i<this.numboletos;i++){
        console.log(this.name_pas[i].name.length)
        if(this.name_pas[i].name.length<2||this.name_pas[i].apepat.length<2||this.name_pas[i].apemat.length<2){
          alert("Escriba el nombre del pasajero"+(i+1))
          ban=false
        }
        if(this.sel_seat[i]==0){
          alert("Seleccione el asiento del pasajero"+(i+1))
          ban=false
        }
        if(this.aux[i]==this.aux[i+1]&&this.aux[i]!=0){
          alert("Asientos repetidos")
          ban=false
        }
        if(this.tipo_pas[i]=='estudiante'){
          this.descuento+=this.time.cost*0.2
        }
      }
      if(ban){
        this.pay_met()
        this.pay_total=(this.time.cost*this.numboletos)-(this.descuento)
        this.total_iva=this.pay_total*this.time.iva
        this.pay_total=this.pay_total+this.total_iva
        this.select_valid=true
      }
    }
  }
  prueba(){
    console.log(this.cardpay);
  }
  pay(payForm: NgForm):void{
    this.name_pas.length=this.numboletos
    this.sel_seat.length=this.numboletos
    this.tipo_pas.length=this.numboletos
    this.paydata={
      card: this.cardpay,
      total: this.pay_total
    }
    console.log(this.paydata)
    if(!this.authService.prueba){
    this.terminalservice.validatePay(this.paydata).subscribe((payresp: Payresp)=>{
      this.pay_valid=payresp.result
      this.message=payresp.message
      this.showalert=true
      console.log(payresp)
      if(payresp.result){
        for(let i=0;i<this.numboletos;i++){
          this.terminalservice.sendTicket(this.sel_seat[i],this.name_pas[i],this.authService.currentUser.id,this.tipo_pas[i],this.time,this.dia,this.time.cost,this.time.iva,this.cardpay.id).subscribe((aceptado: any)=>{
            if(!aceptado.result){
              alert("Error al asignar pasajero")
            }
            this.pay_charged+=aceptado.total;
          });
        }
        this.router.navigate(['/user/ticket']);
      }
      this.terminalservice.text(this.authService.currentUser.id,this.pay_total,this.message).subscribe((res: boolean)=>{
        console.log(res)
      });
    });
    }
    else{
      this.pay_valid=false;
      this.showalert=true;
      this.router.navigate(['/user/personal/']);
    }
  }
  regresar(n: number):void {
    if(n==1){
      this.search_valid=false
    }
    if(n==2){
      this.select_valid=false
    }
  }
  terminar():void{
    this.router.navigate(['/user']);
  }
  ngOnInit() {
    if(this.authService.prueba){
      this.terminals=[{
        id: 1,
        city: "Aguascalientes",
        name: "Central Camionera Ags",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state:"AGS"
      },
      {
        id: 2,
        city: "Guadalajara",
        name: "Central Camionera GDL",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state:"JAL"
      }];
      this.destinations=[{
        id: 3,
        city: "Culiacan",
        name: "Central Camionera SNL",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state: "SIN"
      },
      {
        id: 1,
        city: "Teocaltiche",
        name: "Central Camionera Teocal",
        address: "Av ags 123 Col. Las americas",
        tel: "96452836",
        zip: "20210",
        state: "JAL"
      }
      ]
      this.times=[{
        id: 1,
        time: "10:20",
        cost:120.00,
        iva:0.16
      },
      {
        id:2,
        time:"12:00",
        cost:145.50,
        iva:0.16
      }]
      this.seats={
        seats: [1,2,3],
        capacity:20
      }
    }
    else{
      this.checkOrig();
    }
  }
  checkOrig(){
    if (!this.authService.prueba)
    this.terminalservice.getorigins().subscribe((origins: Terminal[])=>{
      this.terminals=origins;
    });
    
  }
  checkDest(){
    this.origsel=true;
    console.log(this.origin);
    if (!this.authService.prueba)
    this.terminalservice.getdestinations(this.origin.id).subscribe((destinations: Terminal[])=>{
      this.destinations=destinations;
    });
    
  }
  checkHora(){
    this.destsel=true;
    if (!this.authService.prueba)
    this.terminalservice.getschedules(this.origin.id,this.destination.id).subscribe((times: Schedule[])=>{
      this.times=times;
    });
  }
  pay_met(){
    if( this.authService.prueba){
      this.cards=[
        {id: 1,
        type: "debito",
        company: "Visa",
        number: "10945723837334",
        owner: this.authService.currentUser.userName,
        date: "10/21"
        },
        {
          id: 2,
          type: "debito",
          company: "MasterCard",
          number: "1234567891233",
          owner: this.authService.currentUser.userName,
          date: "10/21"
        },
        {
          id: 3,
          type: "debito",
          company: "Visa",
          number: "54354351233",
          owner: this.authService.currentUser.userName,
          date: "10/21"
        }
      ]
    }
    else{
      this.userservice.showcards(this.authService.currentUser.id).subscribe((cards: Card[])=>{
        this.cards=cards;
        console.log(cards);
      });
    }
  }
  calc_desc(){
    this.descuento=0
    this.tipo_pas.forEach(element => {
      if(element=="estudiante"){
        this.descuento+=this.time.cost*0.2
      }
    });
    this.pay_total=(this.time.cost*this.numboletos)-(this.descuento)
    this.total_iva=this.pay_total*this.time.iva
    this.pay_total=this.pay_total+this.total_iva
  }
  checkSeats(){
    if (!this.authService.prueba)
    this.terminalservice.getSeats(this.time.id,this.dia).subscribe((seats: Seats)=>{
      this.seats=seats
      console.log(seats)
      let ban=true
      let k=0
      this.seatsAva = new Array(seats.capacity-seats.seats.length)
      for(let i=0;i<seats.capacity;i++){
        for(let j=0;j<seats.seats.length;j++){
          if(seats.seats[j].seat==i+1)
          ban=false
        }
        if(ban){
          this.seatsAva[k]=i+1
          k++
        }
        ban=true
        
      }
    });
    else{
      let ban=true
      let k=0
      this.seatsAva = new Array(this.seats.capacity-this.seats.seats.length)
      for(let i=0;i<this.seats.capacity;i++){
        for(let j=0;j<this.seats.seats.length;j++){
          if(this.seats.seats[j]==i+1)
          ban=false
        }
        if(ban){
          this.seatsAva[k]=i+1
          k++
        }
        ban=true
      }
      console.log(this.seatsAva) 
    }
  }  
}
