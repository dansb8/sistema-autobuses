import { Component, OnInit} from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { TerminalService } from '../../../services/terminal.service';
import { Terminal } from 'src/app/interfaces/terminal';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  constructor(private adminService: AdminService, private terminalService: TerminalService) {
  }
  public terminals: Terminal[];
  public terminal: Terminal;
  public year: number;
  public yearMonth: number;
  public month: number;
// variables para grafica de pay
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';
// Variables para grafica
public lineChartData: Array<any> = [
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Descuento'},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Estudiante'},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Normal'},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Acumulado'}
];
public aux: Array<any> = [
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
  {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
];
public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
                                      'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',
                                      'Noviembre', 'Diciembre'];
public lineChartOptions: any = {
  responsive: true
};
public lineChartColors: Array<any> = [
  { // grey
    backgroundColor: 'rgba(66,139,202,0.2)',
    borderColor: 'rgba(66,139,202,1)',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  { // dark grey
    backgroundColor: 'rgba(92,184,92,0.2)',
    borderColor: 'rgba(92,184,92,1)',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  { // grey
    backgroundColor: 'rgba(217,83,79,0.2)',
    borderColor: 'rgba(217,83,79,1)',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(91,192,222,0.4)',
    borderColor: 'rgba(91,192,222,1)',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
];
public lineChartLegend = true;
public lineChartType = 'line';
// variables para grafica de barras
public barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels = [] ;
public barChartType = 'bar';
public barChartLegend = true;
public barChartData: any[] = [
  {data: [], label: 'Ventas Totales'},
];
public getReport(): void {
  this.adminService.getReport(this.year).subscribe((aux: Array<any>) => {
    let k = 0;
      for (let j = 0; j < this.aux[0].data.length; j++) {
        if (aux[k].month === j + 1) {
          this.aux[0].data[j] = aux[k].discount;
          this.aux[1].data[j] = aux[k].student;
          this.aux[2].data[j] = aux[k].normal;
          this.aux[3].data[j] = aux[k].total;
          k++;
        } else {
          this.aux[0].data[j] = 0;
          this.aux[1].data[j] = 0;
          this.aux[2].data[j] = 0;
          this.aux[3].data[j] = 0;
        }
      }
    this.getValues();
  });
}
public getReportMonth(): void {
  this.adminService.getReportMonth(this.yearMonth, this.month).subscribe((array: Array<any>) => {
    console.log(array);
    this.printDays(array);
  });
}
public getValues(): void {
  const _lineChartData: Array<any> = new Array(this.lineChartData.length);
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = this.aux[i].data[j]; // Aqui se van a modificar valores
    }
  }
  this.lineChartData = _lineChartData;
}
public printDays(array: Array<any>): void {
  const aux = [];
  const data = [];
  let k = 0;
  console.log(array[0].result2.length);
  for (let i = 0; i < array[0].days; i ++) {
    if ( array[0].result2.length > k && array[0].result2[k].day === i + 1) {

      data[i] = array[0].result2[k].total;
      k++;
    } else {
      data[i] = 0;
    }
    aux[i] = i + 1;
  }
  this.barChartData[0].data = data;
  this.barChartLabels = aux;
}


// eventos
public chartClicked(e: any): void {
  console.log(e);
}
public chartHovered(e: any): void {
  console.log(e);
}
ngOnInit() {
  this.pieChartLabels = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
  this.pieChartData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  this.terminalService.getorigins().subscribe((terminals: Terminal[]) => {
    this.terminals = terminals;
  });
}
}
