import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.css'],
})
export class CalendaryComponent implements OnInit {
  @Output() dayClicked = new EventEmitter<string>();

  week: any = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];

  monthSelect!: any[];
  dateSelect: any;
  dateValue: any;
  id: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getDaysFromDate(moment().month() + 2, moment().year());
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment.utc(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format('MM-YYYY');
    const parse = `${day.value}-${monthYear}`;
    const date = `${day.value}${monthYear}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;

    console.log('Dia Seleccionado: ' + date);

    this.dayClicked.emit(parse);
  }

  getPopoverContent() {
    if (this.router.url === '/estudiante') {
      return 'Contenido para estudiante';
    } else {
      return 'Contenido por defecto';
    }
  }
  getId(day:any){
    this.id = day
  }
}
