import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';

const routes: Routes = [
  {
    path : 'admin' , component : HomeAdminComponent
  },
  {
    path : 'docente' , component : HomeDocenteComponent
  },
  {
    path : 'estudiante' , component : HomeEstudianteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
