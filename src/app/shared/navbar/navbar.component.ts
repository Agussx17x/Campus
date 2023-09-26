import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {

  constructor(private router: Router, private afAuth: AuthService){}

  //Agregamos y quitamos la clase active par ala responsividad.
  claseActive() {
    let header = document.querySelector('header');
    header?.classList.toggle('active');
  }
  icon : string = 'person_circle'
  
  shouldShowNavbar(): boolean {
    // Obtener la URL actual
    const currentUrl = this.router.url;
    
    // Verificar si la URL es la de la página de inicio de sesión
    return currentUrl !== '/login'; // Ajusta la URL según tu enrutamiento
  }
  cerrarsesion(){
    this.afAuth.logout()
  }
}
