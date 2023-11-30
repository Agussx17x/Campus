import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  icon: string = 'person_circle';

  constructor(private router: Router, private afAuth: AuthService) {}

  // Esta función agrega y quita la clase 'active' para la responsividad.
  claseActive() {
    let header = document.querySelector('header');
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
    this.afAuth.logout();
  }
}
