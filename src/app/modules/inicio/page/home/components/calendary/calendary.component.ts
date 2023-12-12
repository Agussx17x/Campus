// Primera Parte
import { Component, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Trabajos } from 'src/app/models/trabajos';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import 'bootstrap';

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
  days: any[] = [];
  // Día actual.
  public today: any = moment().startOf('day');
  currentDay!: number;
  private subscriptions: Subscription[] = [];
  constructor(private router: Router, private firestore: AngularFirestore) {}
  ngOnInit(): void {
    this.currentDay = moment().utc().date();
    this.getDaysFromDate(moment().month() + 2, moment().year());
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
    const startDate = moment.utc(
      `${year}-${month.toString().padStart(2, '0')}-01`
    );
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        value: a,
        month: month - 1,
        year: year,
        name: dayObject.format('dddd'),
        indexWeek: dayObject.isoWeekday(),
      };
    });
    this.monthSelect = arrayDays;

    // Cancela las suscripciones existentes
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];

    // Obtiene las secciones y sus materiales de estudio
    const sectionsSubscription = this.getSections().subscribe((sections) => {
      // Crea una nueva lista de materiales de estudio
      const newMaterials: Trabajos[] = [];
      sections.forEach((section) => {
        const materialsSubscription = this.getStudyMaterials(
          section.id
        ).subscribe((materials) => {
          newMaterials.push(...materials);
        });
        this.subscriptions.push(materialsSubscription);
      });
      // Actualiza la lista de materiales de estudio
      this.materials = newMaterials;
    });
    this.subscriptions.push(sectionsSubscription);
  }

  // Método para cambiar el mes actual.
  changeMonth(flag: number) {
    console.log('Cambiando de mes...');
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
    this.getPopoverContent;
  }
  // Método para obtener el contenido del popover.
  getPopoverContent(day: any) {
    // Filtra los materiales para obtener solo los que se deben entregar en el día, mes y año especificados
    const materialsForDay = this.materials.filter((material) => {
      const materialDate = moment(material.fechaEntrega, 'YYYY-MM-DD');
      return (
        materialDate.date() === day.value &&
        materialDate.month() === (day.month - 1) &&
        materialDate.year() === day.year
      );
    });
    let content = '';
    for (const material of materialsForDay) {
      content += `Título: ${material.titulo}, Fecha de entrega: ${material.fechaEntrega}\n`;
    }
    return content;
  }
  
  hasPopoverContent(day: any) {
    // Verifica si hay materiales para el día especificado
    const materialsForDay = this.materials.filter((material) => {
      const materialDate = moment(material.fechaEntrega, 'YYYY-MM-DD');
      return (
        materialDate.date() === day.value &&
        materialDate.month() === (day.month - 1) &&
        materialDate.year() === day.year
      );
    });
    return materialsForDay.length > 0;
  }
  getId(day: any) {
    console.log('Obteniendo id');
    this.id = day;
  }
  //Dia Actual
  isCurrentDay(day: any) {
    const today = moment();
    const dayObject = moment(
      `${this.dateSelect.year()}-${this.dateSelect.month()}-${day.value}`
    );
    return today.isSame(dayObject, 'day');
  }
}
