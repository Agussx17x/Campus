import { Component } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Seccion } from 'src/app/models/seccion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})


export class TableComponent {
  constructor(private crudService: CrudService, private router : Router) {}
  secciones: Seccion[] = [];

  nuevaSeccion = { titulo: '', descripcion: '' };
  
  nuevoMaterial = {
    titulo: '',
    descripcion: '',
    fechaEntrega: '',
    urlDescarga: '',
  };

  materialesPorSeccion: any = {};


  ngOnInit() {
    this.obtenerSecciones();
  }

  obtenerSecciones() {
    this.crudService.obtenerSecciones().subscribe((secciones) => {
      this.secciones = secciones;
      for (let seccion of secciones) {
        this.obtenerMateriales(seccion.idSeccion);
      }
    });
  }

  crearSeccion() {
    this.crudService.crearSeccion(this.nuevaSeccion).then(() => {
      this.nuevaSeccion = { titulo: '', descripcion: '' };
      this.obtenerSecciones();
    });
  }

  obtenerMateriales(idSeccion:any) {
    this.crudService.obtenerMateriales(idSeccion).subscribe(materiales => {
      this.materialesPorSeccion[idSeccion] = materiales;
    });
  }

  crearMaterial(idSeccion:any) {
    this.crudService.crearMaterial(idSeccion, this.nuevoMaterial).then(() => {
      this.nuevoMaterial = {
        titulo: '',
        descripcion: '',
        fechaEntrega: '',
        urlDescarga: '',
      };
      this.obtenerMateriales(idSeccion);
    });
  }
  botones() {
    // Obtener la URL actual
    const currentUrl = this.router.url;
    return currentUrl !== '/estudiante/materia'
  }
}
