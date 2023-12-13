import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  public isGridView: boolean = false;
  public gridStyle: any = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  };
  public materias: any[] = [];
  public selectedOption = '1';

  constructor(private crudService: CrudService) {
    this.setGridStyle();
  }
  // Obtener datos de materias del servicio
  ngOnInit() {
    // Suscribirse al observable para obtener datos de materias
    this.crudService.obtenerMaterias().subscribe((data) => {
      // Mapear los datos recibidos
      this.materias = data.map((e) => {
        // Extraer los datos del documento y proporcionar valores predeterminados si es necesario
        const data = e.payload.doc.data() as {
          nombre: string;
          tipo: string;
          icono: string;
        };
        // Devolver un objeto con propiedades seguras
        return {
          id: e.payload.doc.id,
          nombre: data.nombre || '',
          tipo: data.tipo || '',
          icono: data.icono || '',
          ...(typeof data === 'object' ? data : {}),
        };
      });
    });
  }

  public changeButton() {
    // Cambiar el estado de la vista entre cuadrícula y lista
    this.isGridView = !this.isGridView;
    // Aplicar el estilo correspondiente
    this.setGridStyle();
  }

  private setGridStyle() {
    // Si la vista es de cuadrícula, aplica el estilo de cuadrícula, de lo contrario, aplica el estilo de bloque
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

  public onOrderChange() {
    // Utiliza un switch para determinar la opción seleccionada y ordena las materias en consecuencia
    switch (this.selectedOption) {
      case '1':
        // Ordenar alfabéticamente ascendente por nombre
        this.materias.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case '2':
        // Ordenar alfabéticamente descendente por nombre
        this.materias.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }
  }
}
