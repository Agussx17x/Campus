import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { getStorage, ref, uploadBytes } from "firebase/storage";

@Component({
  selector: 'app-form-docs',
  templateUrl: './form-docs.component.html',
  styleUrls: ['./form-docs.component.css']
})
export class FormDocsComponent {

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

  constructor(public servicioCrud: CrudService){
  };
  
  //Subir Archivo a Storage
  uploadFile(event:any) {
    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, 'docs/'+this.trabajo.value.titulo);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Archivo cargado con exito!!');
    });
  }
  
  async agregarTrabajo() {
    if (this.trabajo.valid) {
      let nuevoTrabajo: Trabajos = {
        idTrabajo: '',
        titulo: this.trabajo.value.titulo!,
        descripcion: this.trabajo.value.descripcion!,
        docs: this.trabajo.value.docs!
      };

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
}
