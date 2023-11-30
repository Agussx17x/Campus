import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Trabajos } from 'src/app/models/trabajos';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.css'],
})
export class CalendaryComponent implements OnInit {
  // Array con los nombres de los días de la semana.
  week: any = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];
  // Array que contendrá los días del mes seleccionado.
  monthSelect!: any[];
  // Fecha actual seleccionada.
  dateSelect: any;
  // Fecha seleccionada cuando se hace clic en un día.
  dateValue: any;
  // Valor del día seleccionado.
  id: any;
  materials: Trabajos[] = [];
  // Día actual.
  public today: any = moment().startOf('day');
  currentDay!: number;
  constructor(private router: Router, private firestore: AngularFirestore) {}
  ngOnInit(): void {
    // Obtén el día actual
    this.currentDay = moment().utc().date();
    // Obtiene los días del mes actual.
    this.getDaysFromDate(moment().month() + 2, moment().year());
    // Obtiene las secciones y sus materiales de estudio
    this.getSections().subscribe((sections) => {
      sections.forEach((section) => {
        this.getStudyMaterials(section.id).subscribe((materials) => {
          this.materials = [...this.materials, ...materials];
        });
      });
    });
  }
  getSections() {
    return this.firestore
      .collection('secciones')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any; // Cambia 'unknown' por 'any'
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getStudyMaterials(seccionId: string) {
    return this.firestore
      .collection(`secciones/${seccionId}/materiales`)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Trabajos;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
  // Método para obtener los días de un mes y año específicos.
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
        value: a,
        month: month - 1, // los meses en JavaScript empiezan en 0
        year: year,
        name: dayObject.format('dddd'),
        indexWeek: dayObject.isoWeekday(),
      };
    });
    this.monthSelect = arrayDays;
  }

  // Método para cambiar el mes actual.
  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }
  // Método para obtener el contenido del popover.
  getPopoverContent(day: any) {
    // Filtra los materiales para obtener solo los que se deben entregar en el día especificado
    const materialsForDay = this.materials.filter(
      (material) =>
        moment(material.fechaEntrega, 'YYYY-MM-DD').date() === day.value
    );
    let content = '';
    for (const material of materialsForDay) {
      content += `Título: ${material.titulo}, Fecha de entrega: ${material.fechaEntrega}\n`;
    }
    return content;
  }

  getId(day: any) {
    this.id = day;
  }

  isCurrentDay(day: any) {
    const today = moment();
    const dayObject = moment(
      `${this.dateSelect.year()}-${this.dateSelect.month()}-${day.value}`
    );
    return today.isSame(dayObject, 'day');
  }
}
