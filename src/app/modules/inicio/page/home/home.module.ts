import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
//Componentes
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
//"" Compartidos
import { AvisosComponent } from './components/avisos/avisos.component';
import { CalendaryComponent } from './components/calendary/calendary.component';
import { MateriaComponent } from './components/materia/materia.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
//Modulos
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule,_MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TableComponent } from './components/table/table.component';
import { NgxPaginationModule } from "ngx-pagination";
import { CardComponent } from './components/card-materias/card.component';
import { ListaMateriasComponent } from './components/lista-materias/lista-materias.component';


@NgModule({
  declarations: [
    HomeAdminComponent,
    HomeDocenteComponent,
    HomeEstudianteComponent,
    AvisosComponent,
    CardComponent,
    CalendaryComponent,
    MateriaComponent,
    PerfilComponent,
    ListaUsuariosComponent,
    TableComponent,
    ListaMateriasComponent
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
    PopoverModule.forRoot(),
    NgxPaginationModule
  ],
  exports: [
    HomeAdminComponent,
    HomeDocenteComponent,
    HomeEstudianteComponent,
    AvisosComponent,
    CardComponent,
    CalendaryComponent,
    MateriaComponent,
    ListaUsuariosComponent,
    PerfilComponent,
    PopoverModule,
    TableComponent,
    ListaMateriasComponent
  ],
})
export class HomeModule {}
