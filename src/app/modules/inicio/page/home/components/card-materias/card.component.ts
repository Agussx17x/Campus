import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  // Variable para mantener el estado de la vista (cuadrícula o lista).
  public isGridView: boolean = false;

  // Objeto que define los estilos de la cuadrícula.
  public gridStyle: {
    display: string;
    gridTemplateColumns?: string;
    gap?: string;
  } = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  };

  // Array de materias.
  public materias = [
    { nombre: 'Analisis Matemático I', tipo: 'analisis', icon: 'function' },
    { nombre: 'Química', tipo: 'quimica', icon: 'co2' },
    // Agrega más materias según sea necesario...
  ];

  // Opción seleccionada en el menú desplegable.
  public selectedOption = '1';

  constructor() {
    this.setGridStyle(); // Asegura que los estilos se establezcan correctamente al inicio
  }

  // Metodo para cambiar la vista entre cuadricula y lista.
  public changeButton() {
    this.isGridView = !this.isGridView;
    this.setGridStyle();
  }

  // Método para aplicar el estilo de cuadrícula o lista.
  private setGridStyle() {
    // Si isGridView es true, se vera en modo cuadrícula.
    if (this.isGridView) {
      this.gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      };
    } else {
      this.gridStyle = {
        display: 'block',
      };
    }
  }

  // Método para manejar el cambio en la opción seleccionada.
  public onOrderChange() {
    switch (this.selectedOption) {
      case '1': // Orden alfabético (A-Z)
        this.materias.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case '2': // Orden alfabético (Z-A)
        this.materias.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }
  }
}
