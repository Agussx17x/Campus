import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

//Componentes
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
//"" Compartidos
import { AvisosComponent } from './components/avisos/avisos.component';
import { CardComponent } from './components/card-materias/card.component';
import { CalendaryComponent } from './components/calendary/calendary.component';
import { FormMatComponent } from './components/form-mat/form-mat.component';
import { MateriaComponent } from './components/materia/materia.component';
//Modulos
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { PerfilComponent } from './components/perfil/perfil.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule,_MatSlideToggleRequiredValidatorModule,} from '@angular/material/slide-toggle';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeAdminComponent,
    HomeDocenteComponent,
    HomeEstudianteComponent,
    AvisosComponent,
    CardComponent,
    CalendaryComponent,
    FormMatComponent,
    MateriaComponent,
    PerfilComponent
    ListaUsuariosComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HomeAdminComponent,
    HomeDocenteComponent,
    HomeEstudianteComponent,
    AvisosComponent,
    CardComponent,
    CalendaryComponent,
    FormMatComponent,
    MateriaComponent,
    ListaUsuariosComponent,
    PerfilComponent,
  ],
})
export class HomeModule {}
