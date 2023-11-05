import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { CrudService } from 'src/app/modules/inicio/page/home/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  coleccionTrabajos: Trabajos[] = [];
  trabajoSeleccionado!: Trabajos; // ! Recibe valores vacios (o tipo Any)
  modalVisible:boolean = false;

  constructor(
    public servicioCrud: CrudService
  ){}

  ngOnInit(): void{
    
  }
  // Solo va a visualizar la informacion del trabajo
  mostrarVer(info: Trabajos){
    this.modalVisible = true;
    // Info resguarda la informacion del trabajo
    this.trabajoSeleccionado = info;
  }
}
