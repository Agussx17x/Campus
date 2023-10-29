import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent {
  coleccionTrabajos: Trabajos[] = [];

  trabajo = new FormGroup({
    //Docs
    titulo: new FormControl('', Validators.required),
    docs: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
  });

  constructor(public servicioCrud: CrudService, private router: Router) {}

  ngOnInit(): void {
    this.servicioCrud.obtenerTrabajos().subscribe((trabajos) => {
      this.coleccionTrabajos = trabajos;
    });
  }

  async agregarTrabajo(event: any) {
    if (this.trabajo.valid) {
      let nuevoTrabajo: Trabajos = {
        idTrabajo: 0,
        fecha: this.trabajo.value.fecha!,
        titulo: this.trabajo.value.titulo!,
        descripcion: this.trabajo.value.descripcion!,
        docs: this.trabajo.value.docs!,
      };
      const file = event.target.files[0];
      const storage = getStorage();
      const storageRef = ref(
        storage,
        'docs/' + '/' + this.trabajo.value.fecha + this.trabajo.value.titulo
      );
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Archivo cargado con exito!!');
      });

      await this.servicioCrud
        .crearTrabajos(nuevoTrabajo)
        .then((trabajos) => {
          alert('ha agregado un nuevo trabajo con exito');
        })
        .catch((error) => {
          alert('Hubo un error al cargar un nuevo trabajo \n' + error);
        });
    }
  }

  selectDay!: string;

  openModal(day: string) {
    this.selectDay = day;
  }
}
