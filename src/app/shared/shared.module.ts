import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CalendaryComponent } from './calendary/calendary.component';

import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from './card/card.component';
import { AvisosComponent } from './avisos/avisos.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CalendaryComponent,
    CardComponent,
    AvisosComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AppRoutingModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    CalendaryComponent,
    CardComponent,
    AvisosComponent,
  ],
})
export class SharedModule {}
