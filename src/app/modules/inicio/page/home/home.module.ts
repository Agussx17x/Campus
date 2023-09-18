import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { AvisosComponent } from './components/avisos/avisos.component';
import { CardComponent } from './components/card/card.component';
import { CalendaryComponent } from './components/calendary/calendary.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { MateriasComponent } from './components/materias/materias.component';


@NgModule({
  declarations: [
    HomeAdminComponent,
    HomeDocenteComponent,
    HomeEstudianteComponent,
    AvisosComponent,
    CardComponent,
    CalendaryComponent,
    MateriasComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
  ],
  exports: [
    HomeAdminComponent,
    HomeDocenteComponent,
    HomeEstudianteComponent,
  ]
})
export class HomeModule { }
