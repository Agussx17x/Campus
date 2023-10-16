import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(public servicioCrud: CrudService, private router: Router) {}

  coleccionTrabajos: Trabajos[] = [];

  trabajoSeleccionado!: Trabajos; // Toma valores vacios

  modalVisibleTrabajo: boolean = true;

  //  modalVisible: boolean = false;

  //  eliminarVisible: boolean = false;

  trabajo = new FormGroup({
    //Docs
    titulo: new FormControl('', Validators.required),
    docs: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),

    //Imagen
    /*
    imagen: new FormControl('', Validators.required),
    comentario: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
    */
  });

  ngOnInit(): void {
    this.servicioCrud.obtenerTrabajos().subscribe((trabajos) => {
      this.coleccionTrabajos = trabajos;
    });
  }

  // Esta función añade un nuevo trabajo.
  async agregarTrabajo() {
    if (this.trabajo.valid) {
      let nuevoTrabajo: Trabajos = {
        idTrabajo: '',
        titulo: this.trabajo.value.titulo!,
        descripcion: this.trabajo.value.descripcion!,
        docs: this.trabajo.value.docs!,
      };

      await this.servicioCrud
        .crearTrabajos(nuevoTrabajo)
        .then((trabajos) => {
          alert('ha agregado un nuevo trabajo con exito');
        })
        .catch((error) => {
          alert('Hubo un error al cargar un nuevo trabajo \n' + error);
        });
      this.trabajo.reset();
    }
  }

  // Esta función muestra los valores en los inputs.
  mostrarEdit(trabajoSeleccionado: Trabajos) {
    this.trabajoSeleccionado = trabajoSeleccionado;
    this.trabajo.setValue({
      titulo: trabajoSeleccionado.titulo,
      descripcion: trabajoSeleccionado.descripcion,
      docs: trabajoSeleccionado.docs,
    });
  }

  // Esta función edita o actualiza un trabajo existente.
  editTrabajo() {
    let datos: Trabajos = {
      idTrabajo: this.trabajoSeleccionado.idTrabajo,
      titulo: this.trabajo.value.titulo!,
      descripcion: this.trabajo.value.descripcion!,
      docs: this.trabajo.value.docs!,
    };
  
    this.trabajo.reset();
  
    this.servicioCrud
      .editTrabajo(this.trabajoSeleccionado.idTrabajo, datos)
      .then((trabajos) => {
        alert('Se editó correctamente');
      })
      .catch((error) => {
        alert('No se pudo modificar \n' + error);
      });
  }

  // Esta función muestra el delete en el modal.
  mostrarDelete(trabajoSeleccionado: Trabajos) {
    this.trabajoSeleccionado = trabajoSeleccionado;
  }

  // Esta función elimina un trabajo creado.
  deleteTrabajo() {
    this.servicioCrud
      .deleteTrabajo(this.trabajoSeleccionado.idTrabajo)
      .then((respuesta) => {
        alert('borrado con exito');
      })
      .catch((error) => {
        alert('No se elimino el trabajo \n' + error);
      });
  }

  //Esta función sube un archivo o imagenes a la base.
  uploadFile(event: any) {
    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = ref(
      storage,
      'docs/' + this.trabajoSeleccionado.idTrabajo
    ); //Como nombre del documento, le pongo el id con el que se guardan los datos
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Archivo cargado con exito!!');
    });
  }
}
