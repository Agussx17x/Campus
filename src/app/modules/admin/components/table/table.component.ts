import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {

  constructor(public servicioCrud: CrudService, private router: Router ) {}


  coleccionTrabajos: Trabajos[] = [];

  trabajoSeleccionado!: Trabajos; // Toma valores vacios

  modalVisibleTrabajo: boolean = false;

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

  //editar
  mostrarEdit(trabajoSeleccionado: Trabajos){
    this.trabajoSeleccionado = trabajoSeleccionado
    this.trabajo.setValue({
      titulo: trabajoSeleccionado.titulo,
      descripcion: trabajoSeleccionado.descripcion,
      docs: trabajoSeleccionado.docs,
    })
  }
  editTrabajo(){
    let datos : Trabajos = {
      idTrabajo: this.trabajoSeleccionado.idTrabajo,
      titulo:this.trabajoSeleccionado.titulo!,
      descripcion:this.trabajoSeleccionado.descripcion!,
      docs:this.trabajoSeleccionado.docs!,
    }
    this.servicioCrud.editTrabajo(this.trabajoSeleccionado.idTrabajo, datos)
    .then((trabajos) => {
      alert('Se editó correctamente')
    })
    .catch(error=>{
      alert('No se pudo modificar \n'+ error)
    })
  }
  mostrarDelete(){
  }
  deleteTrabajo(){
  }
}
