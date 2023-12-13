import { Component } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';  // Importa el idioma español.

@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.css']
})
export class CalendaryComponent {
  // Array que contendrá los días del mes seleccionado.
  monthSelect!: any[];
  // Fecha actual seleccionada.
  dateSelect: any;

  constructor() {
    moment.locale('es');  // Establece el idioma español como el idioma por defecto.
    this.dateSelect = moment();
    this.getDaysFromDate(this.dateSelect.month(), this.dateSelect.year());
  }

  // Método para obtener los días de un mes y año específicos.
  getDaysFromDate(month: number, year: number) {
    const startDate = moment([year, month]);
    const endDate = startDate.clone().endOf('month');
    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);
    const arrayDays = [...Array(numberDays)].map((_, i) => {
      const dayObject = moment([year, month, i + 1]);
      const isToday = dayObject.isSame(moment(), 'day');
      return {
        value: i + 1,
        month: month,
        year: year,
        name: dayObject.format('dddd'),
        indexWeek: dayObject.isoWeekday(),
        isToday: isToday
      };
    });
    this.monthSelect = arrayDays;
  }
  

  // Método para cambiar el mes actual.
  changeMonth(flag: number) {
    if (flag < 0) {
      this.dateSelect = this.dateSelect.clone().subtract(1, 'month');
    } else {
      this.dateSelect = this.dateSelect.clone().add(1, 'month');
    }
    this.getDaysFromDate(this.dateSelect.month(), this.dateSelect.year());
  }
}
