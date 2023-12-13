import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ListaUsuariosService } from 'src/app/modules/inicio/page/home/services/lista-usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  icon: string = 'person_circle';
  estaLogueado: boolean = false;
  rutaHome!: string;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private afAuth: AngularFireAuth,
    private listaUsuariosService: ListaUsuariosService
  ) {
    // Escucha los cambios de ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.actualizarEstadoAutenticacion();
      }
    });
  }

  ngOnInit(): void {
    this.actualizarEstadoAutenticacion();
  }

  actualizarEstadoAutenticacion(): void {
    // Se suscribe al observable authState de AngularFireAuth para monitorear el estado de autenticación del usuario.
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Cuando el usuario está conectado, se obtiene el uid del usuario actual.
        const uidUsuarioLogueado = user.uid;
        // Se suscribe al observable obtenerUsuarios() de ListaUsuariosService para recuperar todos los usuarios.
        this.listaUsuariosService.obtenerUsuarios().subscribe((usuarios) => {
          // Se busca el usuario actual en la lista de usuarios recuperada.
          const usuarioLogueado = usuarios.find(
            (u) => u.uid === uidUsuarioLogueado
          );

          if (usuarioLogueado) {
            // Si se encuentra el usuario actual, se establece estaLogueado en true y se determina la rutaHome según su credencial.
            this.estaLogueado = true;
            switch (usuarioLogueado.credencial) {
              case 'adm':
                this.rutaHome = '/admin';
                break;
              case 'est':
                this.rutaHome = '/estudiante';
                break;
              case 'doc':
                this.rutaHome = '/docente';
                break;
              default:
                this.rutaHome = '/home';
            }
          } else {
            // Si no se encuentra el usuario actual en la lista, se establece estaLogueado en false.
            this.estaLogueado = false;
          }
        });
      } else {
        // Si el usuario no está conectado, se establece estaLogueado en false.
        this.estaLogueado = false;
      }
    });
  }

  // Esta función agrega y quita la clase 'active' para la responsividad.
  claseActive() {
    // Verifica si se encontró el elemento <header> antes de intentar operar con él.
    let header = document.querySelector('header');
    // Agrega o quita la clase 'active' al elemento <header> según su presencia actual.
    header?.classList.toggle('active');
  }

  // Esta función verifica si la URL actual es diferente de '/login'. Si es así, muestra la barra de navegación.
  shouldShowNavbar(): boolean {
    // Obtener la URL actual
    const currentUrl = this.router.url;

    // Verificar si la URL es la de la página de inicio de sesión
    return currentUrl !== '/login'; // Ajusta la URL según tu enrutamiento
  }

  // Esta función verifica si la URL actual está en la lista de rutas donde el botón de inicio no debe mostrarse. Si es así, no muestra el botón de inicio.
  showInicio(): boolean {
    // Obtener la URL actual
    const currentUrl = this.router.url;

    // Lista de rutas donde el botón de inicio no debe mostrarse.
    const noInicioRoutes = [
      '/admin',
      '/docente',
      '/estudiante',
      '/register',
      '/lista',
      '/materia',
    ];

    // Verificar si la URL actual está en la lista de rutas donde el botón de inicio no debe mostrarse.
    return !noInicioRoutes.includes(currentUrl);
  }

  // Esta función verifica si la URL actual, está en la lista de rutas donde el botón de nosotros no debe mostrarse. Si es así, no muestra el botón de nosotros.
  showNosotros(): boolean {
    // Obtener la URL actual
    const currentUrl = this.router.url;

    // Lista de rutas donde el botón de nosotros no debe mostrarse.
    const noNosotrosRoutes = [
      '/admin',
      '/docente',
      '/estudiante',
      '/register',
      '/lista',
      '/materia',
    ];

    // Verificar si la URL actual está en la lista de rutas donde el botón de nosotros no debe mostrarse.
    return !noNosotrosRoutes.includes(currentUrl);
  }

  // Esta función verifica si la URL actual está en la lista de rutas donde el botón de inicio de sesión no debe mostrarse. Si es así, no muestra el botón de inicio de sesión.
  login(): boolean {
    // Obtener la URL actual
    const currentUrl = this.router.url;

    // Lista de rutas donde el botón de inicio de sesión no debe mostrarse.
    const noLoginRoutes = [
      '/admin',
      '/docente',
      '/estudiante',
      '/register',
      '/lista',
      '/materia',
    ];

    // Verificar si la URL actual está en la lista de rutas donde el botón de inicio de sesión no debe mostrarse.
    return !noLoginRoutes.includes(currentUrl);
  }

  // Esta función verifica si la URL actual es '/admin' o '/inicio'. Si es así, no muestra el botón de perfil. Si la URL actual es '/docente', muestra el botón de perfil.
  perfil(): boolean {
    // Obtener la URL actual
    const currentUrl = this.router.url;
    if (currentUrl == '/admin') {
      return currentUrl !== '/admin';
    } else {
      if (currentUrl == '/estudiante') {
        return currentUrl == '/estudiante';
      }
    }
    return currentUrl == '/docente';
  }

  // Esta función verifica si la URL actual es '/inicio' o '/nosotros'. Si es así, no muestra el botón de cierre de sesión. Si la URL actual es diferente muestra el botón de cierre de sesión.
  logout() {
    // Obtener la URL actual
    const currentUrl = this.router.url;
    if (currentUrl == '/inicio') {
      return currentUrl !== '/inicio';
    }
    return currentUrl !== '/nosotros';
  }

  // Esta función llama al método de cierre de sesión del servicio de autenticación.
  cerrarsesion() {
    this.AuthService.logout();
  }
}
