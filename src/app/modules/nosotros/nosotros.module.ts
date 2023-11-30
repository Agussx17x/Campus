import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NosotrosRoutingModule } from './nosotros-routing.module';
import { NosotrosComponent } from './page/nosotros/nosotros.component';


@NgModule({
  declarations: [
    NosotrosComponent,
  ],
  imports: [
    CommonModule,
    NosotrosRoutingModule,
  ],
  exports: [
    NosotrosComponent,
  ]
})
export class NosotrosModule { }
