import { Component, ViewChild } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'src/app/modules/inicio/page/home/services/crud.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Router } from '@angular/router';
import { Avisos } from 'src/app/models/avisos';
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

  // Declaro las variables para almacenar el aviso seleccionado y el usuario.
  avisoSeleccionado!: Avisos;

  // Variables para almacenar el nombre, apellido y tipo de credencial del usuario.
  nombre: string = '';
  apellido: string = '';
  tipoCredencial: string = '';

  // Mapeo de credenciales abreviadas a formas completas.
  credencialesMapping: { [key: string]: string } = {
    adm: 'Administrador',
    doc: 'Docente',
    est: 'Estudiante',
  };

  imagenSeleccionada!: File;

  constructor(
    private crudService: CrudService,
    private avisosService: AvisosService,
    private router: Router,
    private listaUsuariosService: ListaUsuariosService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    // Obtiene la lista de avisos al inicializar el componente.
    this.avisosService.obtenerAvisos().subscribe((avisos) => {
      this.coleccionAvisos = avisos;
    });

    // Nos suscribimos al BehaviorSubject avisoSeleccionado$ del servicio avisos.
    this.avisosService.avisoSeleccionado$.subscribe((aviso) => {
      // Verifica si el aviso emitido no es null.
      if (aviso) {
        // Actualizamos la propiedad avisoSeleccionado del componente con el aviso emitido.
        this.avisoSeleccionado = aviso;
        // Actualizamos los valores del formulario.
        this.avisos.setValue({
          titulo: aviso.titulo,
          descripcion: aviso.descripcion,
        });
      }
    });

    // Muestra el nombre, apellido y credencial del usuario actual suscribiendose.
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Si el usuario se logea, obtiene el uid del usuario atenticado.
        const uidUsuarioLogueado = user.uid;

        // Luego, obtiene la lista de usuarios.
        this.listaUsuariosService.obtenerUsuarios().subscribe((usuarios) => {
          // Encuentra al usuario autenticado en la lista de usuarios.
          const usuarioLogueado = usuarios.find(
            (u) => u.uid === uidUsuarioLogueado
          );

          // Si el usuario autenticado se encuentra en la lista de usuarios
          if (usuarioLogueado) {
            // Almacena el nombre y apellido del usuario.
            this.nombre = usuarioLogueado.nombre;
            this.apellido = usuarioLogueado.apellido;
            // Traduce la credencial abreviada.
            this.tipoCredencial =
              this.credencialesMapping[usuarioLogueado.credencial] ||
              'Usuario sin tipo';
          }
        });
      }
    });
  }

  selectDay!: string;

  // Esta función lo que hace es agregar un nuevo aviso.
  async agregarAviso() {
    // Verifica si los campos están todos completos.
    if (!this.avisos.value.titulo || !this.avisos.value.descripcion) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verifica si los avisos han alcanzado un máximo de 6.
    if (this.coleccionAvisos.length >= 6) {
      alert(
        'Ya has alcanzado el máximo de avisos por hoy, por favor elimine los ya existentes o espere a seguir en otro plazo.'
      );
      return;
    }

    // Si el formulario es valido crea un nuevo aviso.
    if (this.avisos.valid) {
      const idAviso = this.avisosService.generarId();
      console.log(`ID del aviso generado: ${idAviso}`);

      // Genera el ID del aviso previo, para que se pueda guardar correctamente las imágenes.
      let nuevoAviso: Avisos = {
        idAvisos: idAviso,
        titulo: this.avisos.value.titulo!,
        descripcion: this.avisos.value.descripcion!,
        imagenUrl: '',
      };

      // Sube la imagen antes de crear el aviso.
      if (this.imagenSeleccionada) {
        alert('Subiendo imágen, espere por favor...');
        nuevoAviso.imagenUrl = await this.avisosService.subirImagen(
          this.imagenSeleccionada,
          idAviso
        );
      }

      console.log(nuevoAviso); // Registra el objeto nuevoAviso.

      // Creas el aviso usando el mismo ID
      await this.avisosService
        .crearAvisos(idAviso, nuevoAviso)
        .then((avisos) => {
          alert('Ha agregado un nuevo aviso con éxito');
        })
        .catch((error) => {
          alert('Hubo un error al intentar cargar el nuevo aviso \n' + error);
        });
    }
  }

  // Esta función ajusta la altura al escribir en el textarea.
  ajustarAltura(event: any) {
    // Restablece la altura del textarea a 'auto'.
    event.target.style.height = 'auto';
    // Ajusta la altura del textarea a la altura de su contenido.
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  // Función para editar el aviso nuevo.
  async editarAviso() {
    if (this.avisoSeleccionado) {
      // Preparamos los datos del aviso seleccionado.
      let datos: Avisos = {
        idAvisos: this.avisoSeleccionado.idAvisos,
        titulo: this.avisos.value.titulo!,
        descripcion: this.avisos.value.descripcion!,
        imagenUrl: this.avisoSeleccionado.imagenUrl,
      };

      // Si se seleccionó una nueva imagen, sube la imagen y actualiza la URL de la imagen en los datos del aviso.
      if (this.imagenSeleccionada) {
        alert('Actualizando su imágen, espere por favor...');
        datos.imagenUrl = await this.avisosService.subirImagen(
          this.imagenSeleccionada,
          this.avisoSeleccionado.idAvisos
        );
      }
      // Llama al método 'modificarAvisos' del servicio 'avisosService' para actualizar el aviso en la base de datos.
      this.avisosService
        .modificarAvisos(this.avisoSeleccionado.idAvisos, datos)
        .then((respuesta) => {
          alert('El aviso ha sido editado con éxito.');
        })
        .catch((error) => {
          alert(
            'Ha habido un error al intentar editar el aviso, razón: \n' + error
          );
        });
    } else {
      alert('Por favor, selecciona un aviso antes de intentar editarlo.');
    }
  }

  // Esta función maneja la sección de una imágen.
  manejarSeleccionImagen(event: Event) {
    // Obtiene el elemento HTML que disparo el input de tipo "File".
    const input = event.target as HTMLInputElement;
    // Verifica si el input tiene archivos y si el primer archivo existe.
    if (input.files && input.files[0]) {
      // Obtiene el primer archivo del input.
      const file: File = input.files[0];
      // Verifica si el archivo es una imagen.
      if (!file.type.startsWith('image/')) {
        // Si el archivo no es una imagen, muestra una alerta al usuario y termina la función.
        alert('Por favor, selecciona una imagen.');
        return;
      }
      // Si el archivo es una imagen, lo guarda en la propiedad "imagenSeleccionada".
      this.imagenSeleccionada = file;
    }
  }
}
