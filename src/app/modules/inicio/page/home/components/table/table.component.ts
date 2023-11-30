import { Component, ElementRef, ViewChild } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { Seccion } from 'src/app/models/seccion';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  // Variable para almacenar el archivo seleccionado por el usuario.
  private file!: File;

  // Varaible para almacenar las secciones.
  secciones: Seccion[] = [];

  // Varaible para almacenar los datos de las secciones.
  nuevaSeccion = { titulo: '', descripcion: '' };

  // Varaible para almacenar los usuarios.
  usuario!: Usuario;

  // Variable para almacenar los datos de los materiales.
  nuevoMaterial = {
    titulo: '',
    descripcion: '',
    fechaEntrega: '',
    urlDescarga: '',
  };

  materialesPorSeccion: any = {};

  constructor(
    private crudService: CrudService,
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  async ngOnInit() {
    // Obtiene el ID del usuario actual.
    const uid = await this.authService.getuid();

    // Si el usuario existe, obtiene sus datos de Firestore.
    if (uid) {
      const doc = await this.firestore
        .collection('usuarios')
        .doc(uid)
        .get()
        .toPromise();
      if (doc && doc.exists) {
        this.usuario = doc.data() as Usuario;
      }
    }

    // Obtiene las secciones.
    this.obtenerSecciones();
  }

  // Esta función obtiene las secciones.
  obtenerSecciones() {
    this.crudService.obtenerSecciones().subscribe((secciones) => {
      this.secciones = secciones;
      for (let seccion of secciones) {
        this.obtenerMateriales(seccion.idSeccion);
      }
    });
  }

  // Esta función crea una nueva sección.
  crearSeccion() {
    this.crudService.crearSeccion(this.nuevaSeccion).then(() => {
      this.nuevaSeccion = { titulo: '', descripcion: '' };
      this.obtenerSecciones();
    });
  }

  // Esta función obtiene los materiales de una sección.
  obtenerMateriales(idSeccion: any) {
    this.crudService.obtenerMateriales(idSeccion).subscribe((materiales) => {
      this.materialesPorSeccion[idSeccion] = materiales;
    });
  }

  // Esta función menja la selección de archvo.
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  // Esta función crea un nuevo material.
  async crearMaterial(idSeccion: any) {
    if (this.file) {
      const url = await this.crudService.uploadFile(this.file);
      this.nuevoMaterial.urlDescarga = url;
    }
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

  // Esta función deternminasu se deben mostrar los botones.
  botones() {
    // Obtiene la URL actual.
    const currentUrl = this.router.url;
    return currentUrl !== '/estudiante/materia';
  }

  mostrarEditar() {}

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

  // Método para determinar si la sección está expandida o no
  isSectionExpanded(seccion: Seccion): boolean {
    // Obtiene el estado actual de la sección desde LocalStorage.
    const currentState = localStorage.getItem(
      `sectionState_${seccion.idSeccion}`
    );
    // Devuelve el estado almacenado o verdadero si no hay estado almacenado.
    return currentState ? JSON.parse(currentState) : true;
  }
}
