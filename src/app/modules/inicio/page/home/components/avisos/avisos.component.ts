import { Component, ElementRef } from '@angular/core'; // ElementRef sirven para manipular elementos del DOM.
import { Avisos } from 'src/app/models/avisos';
import { AvisosService } from '../../services/avisos.service';

declare var $: any;

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css'],
})
export class AvisosComponent {
  coleccionAvisos: Avisos[] = [];

  constructor(private avisosService: AvisosService, private el: ElementRef) {}

  ngOnInit(): void {
    this.avisosService.obtenerAvisos().subscribe((avisos) => {
      this.coleccionAvisos = avisos;
    });
  }

  // Esta función cambia el estado del radio de los botones cuando se hace "click".
  changeSlide(index: number) {
    // Seleccionamos todos los elementos "input" de tipo "radio".
    const inputs = this.el.nativeElement.querySelectorAll(
      'input[type="radio"]'
    );
    // Luego iteramos todos los elementos en un bucle "forEach" para recibir más de un parametro.
    inputs.forEach((input: HTMLInputElement, i: number) => {
      // Si "i" es igual del botón que se hizo "click" previamente, se marca como seleccionado.
      if (i === index) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    });
  }
}
