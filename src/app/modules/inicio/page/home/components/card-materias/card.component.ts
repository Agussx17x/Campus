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

  ngOnInit() {
    this.crudService.obtenerMaterias().subscribe((data) => {
      this.materias = data.map((e) => {
        const data = e.payload.doc.data() as {
          nombre: string;
          tipo: string;
          icono: string;
        };
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
    this.isGridView = !this.isGridView;
    this.setGridStyle();
  }

  private setGridStyle() {
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
    switch (this.selectedOption) {
      case '1':
        this.materias.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case '2':
        this.materias.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }
  }
}
