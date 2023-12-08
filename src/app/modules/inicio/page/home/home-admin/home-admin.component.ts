import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'src/app/modules/inicio/page/home/services/crud.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Router } from '@angular/router';
import { Avisos } from 'src/app/models/avisos';
import { Materia } from 'src/app/models/materia';
import { AvisosService } from '../services/avisos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ListaUsuariosService } from '../services/lista-usuarios.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent {
  // Colecciones
  coleccionTrabajos: Trabajos[] = [];
  coleccionAvisos: Avisos[] = [];
  coleccionMateria: Materia[] = [];
  // FormGroups
  trabajo = new FormGroup({
    titulo: new FormControl('', Validators.required),
    docs: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
  });
  avisos = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });
  materias = new FormGroup({
    idMateria: new FormControl(this.crudService.crearId()),
    titulo: new FormControl('', Validators.required),
    icono: new FormControl('', Validators.required),
  });
  
  
  nombre: string = '';
  apellido: string = '';
  tipoCredencial: string = '';
  // Mapeo de credenciales abreviadas a formas completas.
  credencialesMapping: { [key: string]: string } = {
    adm: 'Administrador',
    doc: 'Docente',
    est: 'Estudiante',
  };
  constructor(
    private crudService: CrudService,
    private avisosService: AvisosService,
    private router: Router,
    private listaUsuariosService: ListaUsuariosService,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    // Luego, obtén la lista de avisos al inicializar el componente
    this.avisosService.obtenerAvisos().subscribe((avisos)=>{
      this.coleccionAvisos = avisos;
    });
    this.materias.setValue({
      idMateria: this.crudService.crearId(),
      titulo: '',
      icono: '',
    });
    // Mostrar usuario.
    this.afAuth.authState.subscribe((user)=>{
      if (user) {
        const uidUsuarioLogueado = user.uid;

        this.listaUsuariosService.obtenerUsuarios().subscribe((usuarios)=>{
          const usuarioLogueado = usuarios.find(
            (u) => u.uid === uidUsuarioLogueado
          );
          if (usuarioLogueado) {
            this.nombre = usuarioLogueado.nombre;
            this.apellido = usuarioLogueado.apellido;
            // Traduce la credencial abreviada.
            this.tipoCredencial =
              this.credencialesMapping[usuarioLogueado.credencial]||
              'Usuario sin tipo';
          }
        });
      }
    });
  }
  selectDay!: string;
  async agregarAviso(){
    if (this.avisos.valid) {
      let nuevoAviso: Avisos = {
        idAvisos: '',
        titulo: this.avisos.value.titulo!,
        descripcion: this.avisos.value.descripcion!,
      };
      //ENVIAMOS ESE PRODUCTO
      await this.avisosService
        .crearAvisos(nuevoAviso)
        .then((avisos) => {
          alert('Ha agregado un nuevo aviso con éxito');
        })
        .catch((error) => {
          alert('Hubo un error al intentar cargar el nuevo aviso \n' + error);
        });
    }
  }
  crearMateria(){
    if (this.materias.valid) {
      let data: Materia = {
        idMateria: this.materias.value.idMateria || this.crudService.crearId(),
        titulo: this.materias.value.titulo || '',
        icono: this.materias.value.icono || '',
      };
      this.crudService.crearMateria(data);
      alert('Materia Creada');
      // Restablece el formulario con un nuevo ID
      this.materias.setValue({
        idMateria: this.crudService.crearId(),
        titulo: '',
        icono: '',
      });
    }
  }
}
