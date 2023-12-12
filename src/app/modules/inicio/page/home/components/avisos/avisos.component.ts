import { Component, ElementRef } from '@angular/core'; // ElementRef sirven para manipular elementos del DOM.
import { Avisos } from 'src/app/models/avisos';
import { Usuario } from 'src/app/models/usuario';
import { AvisosService } from '../../services/avisos.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

declare var $: any;

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css'],
})
export class AvisosComponent {
  coleccionAvisos: Avisos[] = [];

  // FormGroup
  avisos = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });

  // Declaro las variables para almacenar el aviso seleccionado y el usuario.
  avisoSeleccionado!: Avisos;
  usuario!: Usuario;

  constructor(
    private avisosService: AvisosService,
    private el: ElementRef,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  async ngOnInit() {
    // Obtiene la lista de avisos al inicializar el componente.
    this.avisosService.obtenerAvisos().subscribe((avisos) => {
      this.coleccionAvisos = avisos;
    });

    // Obtiene el ID del usuario actual.
    const uid = await this.authService.getuid();

    // Si el usuario existe, obtiene sus datos de Firestore.
    if (uid) {
      // En una constante se guarda al usaurio que coincide con su uid.
      const adm = await this.firestore
        .collection('usuarios')
        .doc(uid)
        .get()
        .toPromise();
      // Si adm existe, entonces obtiene los datos del usuario con la instancia usuario.
      if (adm && adm.exists) {
        this.usuario = adm.data() as Usuario;
      }
    }
  }

  // Esta función cambia el estado del radio de los botones cuando se hace "click".
  changeSlide(index: number) {
    // Seleccionamos todos los elementos "input" de tipo "radio".
    const inputs = this.el.nativeElement.querySelectorAll(
      'input[type="radio"]'
    );
    // Luego iteramos todos los elementos en un bucle "forEach" para recibir más de un parametro.
    inputs.forEach((input: HTMLInputElement, i: number) => {
      // Si "i" es igual del botón que se hizo "click" previamente, se marca como seleccionado.
      if (i === index) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
  }

  // Función para mostrar modal de edición.
  mostrarEditar(avisoSeleccionado: Avisos) {
    this.avisoSeleccionado = avisoSeleccionado;
    this.avisos.setValue({
      titulo: avisoSeleccionado.titulo,
      descripcion: avisoSeleccionado.descripcion,
    });

    // Emitir el aviso seleccionado a través del servicio.
    this.avisosService.avisoSeleccionado$.next(this.avisoSeleccionado);
  }

  // Función para eliminar un aviso.
  borrarAviso(avisoSeleccionado: Avisos) {
    const confirmacion = confirm(
      '¿Está seguro que desea borrar el siguiente aviso? (' +
        avisoSeleccionado.titulo +
        ')'
    );
    if (confirmacion) {
      this.avisoSeleccionado = avisoSeleccionado;
      this.avisosService
        .eliminarAvisos(this.avisoSeleccionado.idAvisos, this.avisoSeleccionado)
        .then((respuesta) => {
          alert('Se ha eliminado con éxito el aviso.');
          // Redirige al usuario al primer slider.
          requestAnimationFrame(() => {
            // Bucas el DOM un elemento con el id = '1'.
            const element = document.getElementById('1') as HTMLInputElement;
            // Verifica que el elemento no es null antes de intentar acceder a la propiedad 'checked'.
            if (element) {
              // Establece la propiedad 'checked' del elemento a true.
              element.checked = true;
            }
          });
        })
        .catch((error) => {
          console.error(error);
          alert(
            'Ha habido un error al intentar eliminar el aviso, razón: \n' +
              error
          );
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
}
