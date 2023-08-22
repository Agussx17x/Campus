import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CalendaryComponent } from './calendary/calendary.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CalendaryComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    AppRoutingModule,

  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    CalendaryComponent,
    CardComponent,
  ]
})
export class SharedModule { }
