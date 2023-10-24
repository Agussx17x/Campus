import { Component } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent {
  constructor(){
  }

  selectDay!: number;

  openModal(day: number) {
    this.selectDay = parse;
    //const dialogRef = this.dialog.open(ModalComponent, {
    //  data: { day: this.selectDay },
    //});
  }

  //le agrega a la clase carrousel el intervalo 0  $(".carousel").carousel({
  //  interval: 0
  //});
  //clase btn-nex $(".btn-next")//llama la funcion al hacer click .click(function () {
  //ejecuta $(".carousel").carousel("next");
  //});
}
