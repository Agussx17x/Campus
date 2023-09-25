import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  coleccionTrabajos: Trabajos[] = [];

  trabajoSeleccionado!: Trabajos; // Toma valores vacios

  modalVisibleTrabajo: boolean = false;

  //  modalVisible: boolean = false;

  //  eliminarVisible: boolean = false;

  trabajo = new FormGroup({
    
    //Docs
    titulo: new FormControl('', Validators.required),
    docs : new FormControl ('', Validators.required),
    descripcion : new FormControl ('', Validators.required),
    
    
    //Imagen
    /*
    imagen: new FormControl('', Validators.required),
    comentario: new FormControl('', Validators.required),
    alt: new FormControl('', Validators.required),
    */
  })
  constructor(public servicioCrud:CrudService){}
 
  ngOnInit():void{
    this.servicioCrud.obtenerTrabajos().subscribe(trabajos=> {
      this.coleccionTrabajos = trabajos
    })
  }
}
//!bruno se la come ahjajaj @brunoacu atte: espinosa