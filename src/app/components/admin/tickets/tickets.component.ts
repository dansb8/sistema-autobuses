import { Component} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  constructor(private adminService: AdminService) {
  }
  public year: number;
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
public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
public barChartType = 'bar';
public barChartLegend = true;
public barChartData: any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];
public getReport(): void {
  this.adminService.getReport(this.year).subscribe((aux: Array<any>) => {
    let k = 0;
    console.log(aux[0].discount);
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
    this.modificarValores();
  });
}
public modificarValores(): void {
  const _lineChartData: Array<any> = new Array(this.lineChartData.length);
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = this.aux[i].data[j]; // Aqui se van a modificar valores
    }
  }
  this.lineChartData = _lineChartData;
}

// GRAFICA DE BARRAS
public randomize(): void {
const data = [
  Math.round(Math.random() * 100), 59, 80, (Math.random() * 100), 56, (Math.random() * 100), 40];
  const clone = JSON.parse(JSON.stringify(this.barChartData));
  clone[0].data = data;
  this.barChartData = clone;
}
// eventos
public chartClicked(e: any): void {
  console.log(e);
}

public chartHovered(e: any): void {
  console.log(e);
}
}
