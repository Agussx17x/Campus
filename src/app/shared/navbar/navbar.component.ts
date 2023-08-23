import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  //Agregamos y quitamos la clase active par ala responsividad.
  claseActive() {
    let header = document.querySelector('header');
    header?.classList.toggle('active');
  }
}
