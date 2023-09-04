import { Component } from '@angular/core';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.component.html',
  styleUrls: ['./home-docente.component.css'],
})
export class HomeDocenteComponent {
  public isGridView = true;

  // Método para cambiar la vista entre cuadrícula y lista
  public changeButton() {
    this.isGridView = !this.isGridView; // Alternar entre cuadrícula y lista
  }
}
