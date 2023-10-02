import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  public isGridView = true;

  // Metodo para cambiar la vista entre cuadricula y lista
  public changeButton() {
    this.isGridView = !this.isGridView;
  }
}
