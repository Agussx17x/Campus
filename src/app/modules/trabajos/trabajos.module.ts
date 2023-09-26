import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabajosRoutingModule } from './trabajos-routing.module';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { CardComponent } from './components/card/card.component';
import { DocsComponent } from './pages/docs/docs.component';
import { ImgComponent } from './pages/img/img.component';


@NgModule({
  declarations: [
    TrabajosComponent,
    CardComponent,
    DocsComponent,
    ImgComponent
  ],
  imports: [
    CommonModule,
    TrabajosRoutingModule
  ]
})
export class TrabajosModule { }
