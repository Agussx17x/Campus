import { Component, ElementRef, ViewChild } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Seccion } from 'src/app/models/seccion';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Material } from 'src/app/models/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  private file!: File;
  materialesPorSeccion: { [idSeccion: string]: Material[] } = {};
  secciones: Seccion[] = [];
  nuevaSeccion = { titulo: '', descripcion: '' };
  usuario!: Usuario;
  idSeccionSeleccionada!: string;
  idMateria!: string;
  nuevoMaterial = { titulo: '', descripcion: '', fechaEntrega: '', url: '' };

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.idMateria = params['id']; // Aquí está el id de la materia
      this.crudService.obtenerSecciones(this.idMateria).subscribe((actions) => {
        this.secciones = actions.map((a) => {
          const data = a.payload.doc.data() as Seccion;
          const id = a.payload.doc.id;
          // Obtiene los materiales de esta sección
          this.crudService
            .obtenerMateriales(this.idMateria, id)
            .subscribe((actions) => {
              this.materialesPorSeccion[id] = actions.map((a) => {
                const data = a.payload.doc.data() as Material;
                const id = a.payload.doc.id;
                return { ...data, id };
              });
            });
          return { ...data, id };
        });
      });
    });
  }
  // Crear seccion dentro de la coleccion de materias.
  crearSeccion() {
    if (this.nuevaSeccion.titulo && this.idMateria) {
      this.crudService
        .crearSeccion(this.idMateria, this.nuevaSeccion)
        .then(() => {
          console.log('Sección creada con éxito');
          this.nuevaSeccion = { titulo: '', descripcion: '' }; // Restablece el formulario
        })
        .catch((error) => {
          console.error('Error al crear la sección:', error);
        });
    } else{
      console.log('Error al cargar sección.')
    }
  }
  // Crear material dependiendo del id de la seccion, dentro de la coleccion de secciones.
  crearMaterial(idSeccion: string) {
    console.log('crear material');
    if (this.nuevoMaterial.titulo && this.idMateria && idSeccion) {
      console.log('dentro del if');
      // Primero, sube el archivo al almacenamiento de Firebase y obtén la URL de descarga.
      this.crudService.uploadFile(this.file).then((url) => {
        console.log('cargando archivo');
        // Agrega la URL de descarga al objeto nuevoMaterial.
        this.nuevoMaterial.url = url;
        // Luego, crea el documento en Firestore.
        this.crudService
          .crearMaterial(this.idMateria, idSeccion, this.nuevoMaterial)
          .then(() => {
            console.log('Material creado con éxito');
            this.nuevoMaterial = {
              titulo: '',
              descripcion: '',
              fechaEntrega: '',
              url: '',
            };
            // Restablece el formulario
            console.log('restablece el formulario');
          })
          .catch((error) => {
            console.error('Error al crear el material:', error);
          });
      });
    } else {
      console.log('uno o varios no existen');
    }
  }
  // Esta función maneja la selección de archivo.
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  // Método para obtener/guardar el estado de la sección y cambiar su estado.
  toggleSectionState(seccion: Seccion): void {
    // Obtén el estado actual de la sección desde LocalStorage.
    const currentState = localStorage.getItem(
      `sectionState_${seccion.idSeccion}`
    );
    // Calcula el nuevo estado, es decir, si hay un estado actual (abierto por defecto).
    const newState = currentState ? !JSON.parse(currentState) : true;
    localStorage.setItem(
      `sectionState_${seccion.idSeccion}`,
      JSON.stringify(newState)
    );
  }
  // Obtener las secciones en firestore database.
  obtenerSecciones() {
    this.route.params.subscribe((params) => {
      const materiaId = params['id']; // Aquí está el id de la materia
      this.crudService.obtenerSecciones(materiaId).subscribe((actions) => {
        this.secciones = actions.map((a) => {
          const data = a.payload.doc.data() as Seccion;
          const id = a.payload.doc.id;
          return { ...data, id };
        });
      });
    });
  }
  // Método para determinar si la sección está expandida o no.
  isSectionExpanded(seccion: Seccion): boolean {
    // Obtiene el estado actual de la sección desde LocalStorage.
    const currentState = localStorage.getItem(
      `sectionState_${seccion.idSeccion}`
    );
    // Devuelve el estado almacenado o verdadero si no hay estado almacenado.
    return currentState ? JSON.parse(currentState) : true;
  }
}
