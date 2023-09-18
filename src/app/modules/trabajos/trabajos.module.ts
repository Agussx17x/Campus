import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabajosRoutingModule } from './trabajos-routing.module';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    TrabajosComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    TrabajosRoutingModule
  ]
})
export class TrabajosModule { }
