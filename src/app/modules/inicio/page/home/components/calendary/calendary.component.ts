import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español.
import { Material } from 'src/app/models/material';
declare var bootstrap: any;
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-calendary',
  templateUrl: './calendary.component.html',
  styleUrls: ['./calendary.component.css'],
})
export class CalendaryComponent implements OnInit, AfterViewInit {
  // Array que contendrá los días del mes seleccionado.
  monthSelect!: any[];
  // Fecha actual seleccionada.
  dateSelect: any;
  materiales: any[] = [];
  isLoading = true; // Agrega esta línea

  constructor(private firestore: AngularFirestore) {
    moment.locale('es'); // Establece el idioma español como el idioma por defecto.
    this.dateSelect = moment();
  }
  ngOnInit() {
    this.getMateriales();
  }

  async getMateriales() {
    this.isLoading = true; // Muestra el spinner
    const materiasSnapshot = (await this.firestore
      .collection('materias')
      .get()
      .toPromise()) as firebase.firestore.QuerySnapshot;
    for (const doc of materiasSnapshot.docs) {
      const materia = doc.data();
      const seccionesSnapshot = await doc.ref.collection('secciones').get();
      for (const doc of seccionesSnapshot.docs) {
        const seccion = doc.data();
        const materialesSnapshot = await doc.ref.collection('materiales').get();
        for (const doc of materialesSnapshot.docs) {
          const material = doc.data() as Material;
          this.materiales.push(material);
        }
      }
    }
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
      const fecha = dayObject.format('YYYY-MM-DD'); // Asegúrate de que el formato de la fecha sea 'YYYY-MM-DD'.
      const materialesDelDia = this.materiales.filter(
        (m) => m.fechaEntrega === fecha
      );
      return {
        value: i + 1,
        month: month,
        year: year,
        name: dayObject.format('dddd'),
        indexWeek: dayObject.isoWeekday(),
        isToday: isToday,
        materiales: materialesDelDia,
      };
    });
    this.monthSelect = arrayDays;
    this.isLoading = false; // Oculta el spinner después de cargar los datos
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

  getPopoverContent(day: any) {
    let content: string[] = []; // Especifica explícitamente que 'content' es un arreglo de cadenas
    if (day.materiales && day.materiales.length > 0) {
      day.materiales.forEach((material: Material) => {
        const fechaFormateada = moment(
          material.fechaEntrega,
          'YYYY-MM-DD'
        ).format('DD-MM-YYYY');
        content.push(` | Título: ${material.titulo}`); // Agrega cada título al arreglo
      });
    }
    return content.join(''); // Une el arreglo sin ningún separador
  }

  ngAfterViewInit() {
    var popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }
}
